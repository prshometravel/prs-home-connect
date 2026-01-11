"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Job = {
  id: string;
  title: string | null;
  category: string | null;
  location: string | null;
  description: string | null;
  created_at: string;
  status?: string | null;
};

const STATUSES = [
  { value: "open", label: "Open" },
  { value: "negotiating", label: "Negotiating" },
  { value: "hired", label: "Hired" },
  { value: "closed", label: "Closed" },
];

export default function ProJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const [statusByJobId, setStatusByJobId] = useState<Record<string, string>>({});
  const [claimingJobId, setClaimingJobId] = useState<string>("");

  const [claimedJobIds, setClaimedJobIds] = useState<Set<string>>(new Set());

  const showMsg = (type: "success" | "error", text: string) => {
    setMessageType(type);
    setMessage(text);
    // auto clear
    window.setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };

  const fmtDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  const load = async () => {
    setLoading(true);
    setMessage("");
    setMessageType("");

    // 1) auth
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;

    // 2) jobs
    const { data: jobsData, error: jobsErr } = await supabase
      .from("jobs")
      .select("id,title,category,location,description,created_at,status")
      .order("created_at", { ascending: false });

    if (jobsErr) {
      showMsg("error", `Failed to load jobs: ${jobsErr.message}`);
      setJobs([]);
      setLoading(false);
      return;
    }

    const list = (jobsData || []) as Job[];
    setJobs(list);

    // initialize dropdown values
    const map: Record<string, string> = {};
    for (const j of list) {
      map[j.id] = (j.status || "open") as string;
    }
    setStatusByJobId(map);

    // 3) claims for this pro (so we can disable already-claimed)
    if (user) {
      const { data: claimsData, error: claimsErr } = await supabase
        .from("job_claims")
        .select("job_id")
        .eq("pro_id", user.id);

      if (!claimsErr && claimsData) {
        setClaimedJobIds(new Set(claimsData.map((c: any) => c.job_id)));
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const containerStyle = useMemo(
    () => ({
      minHeight: "100vh",
      padding: "24px",
      background:
        "radial-gradient(1200px 600px at 20% 0%, #1f2937 0%, #0b1220 45%, #050814 100%)",
      color: "#e5e7eb",
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
    }),
    []
  );

  const cardStyle = {
    background: "rgba(17,24,39,0.65)",
    border: "1px solid rgba(148,163,184,0.25)",
    borderRadius: 14,
    padding: 18,
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  } as const;

  const pillStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(34,197,94,0.5)",
    background: "rgba(34,197,94,0.14)",
    color: "#bbf7d0",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: 0.6,
  } as const;

  const greenBtn = {
    background: "linear-gradient(180deg, #22c55e 0%, #16a34a 100%)",
    color: "#07110a",
    border: "1px solid rgba(34,197,94,0.55)",
    borderRadius: 10,
    padding: "10px 14px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 10px 18px rgba(34,197,94,0.25)",
  } as const;

  const grayBtn = {
    background: "rgba(148,163,184,0.1)",
    color: "#e5e7eb",
    border: "1px solid rgba(148,163,184,0.25)",
    borderRadius: 10,
    padding: "10px 14px",
    fontWeight: 700,
    cursor: "pointer",
  } as const;

  const selectStyle = {
    width: "100%",
    marginTop: 8,
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(148,163,184,0.25)",
    background: "rgba(2,6,23,0.45)",
    color: "#e5e7eb",
  } as const;

  const claimJob = async (jobId: string) => {
    setMessage("");
    setMessageType("");
    setClaimingJobId(jobId);

    try {
      const { data: authData, error: authErr } = await supabase.auth.getUser();
      if (authErr) throw authErr;

      const user = authData?.user;
      if (!user) {
        showMsg("error", "You must be signed in as a Pro to claim a job.");
        setClaimingJobId("");
        return;
      }

      // prevent double-click
      if (claimedJobIds.has(jobId)) {
        showMsg("error", "You already claimed this job.");
        setClaimingJobId("");
        return;
      }

      // Insert claim
      const { error: insertErr } = await supabase.from("job_claims").insert([
        {
          job_id: jobId,
          pro_id: user.id,
          status: "claimed",
        },
      ]);

      if (insertErr) throw insertErr;

      // optional: set the job status to negotiating after claim
      const { error: updErr } = await supabase
        .from("jobs")
        .update({ status: "negotiating" })
        .eq("id", jobId);

      // If update fails, we still keep the claim—just warn, not fail.
      if (updErr) {
        showMsg("success", "Claim saved ✅ (Job status did not update, but claim is recorded.)");
      } else {
        showMsg("success", "Job claimed ✅");
      }

      // update UI immediately
      setClaimedJobIds((prev) => new Set([...Array.from(prev), jobId]));
      setStatusByJobId((prev) => ({ ...prev, [jobId]: "negotiating" }));
    } catch (e: any) {
      showMsg("error", `Claim failed: ${e?.message || "Unknown error"}`);
    } finally {
      setClaimingJobId("");
    }
  };

  const changeStatus = async (jobId: string, newStatus: string) => {
    setStatusByJobId((prev) => ({ ...prev, [jobId]: newStatus }));
    setMessage("");
    setMessageType("");

    const { error } = await supabase
      .from("jobs")
      .update({ status: newStatus })
      .eq("id", jobId);

    if (error) showMsg("error", `Status update failed: ${error.message}`);
    else showMsg("success", "Status updated ✅");
  };

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, margin: 0, fontWeight: 900 }}>Available Jobs</h1>
            <div style={{ marginTop: 6, opacity: 0.9, fontSize: 13 }}>
              PRS Home Connect — Pro Dashboard
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href="/pro/dashboard" style={{ ...grayBtn, textDecoration: "none", display: "inline-block" }}>
              Back Home
            </Link>
            <button type="button" style={grayBtn} onClick={load}>
              Refresh
            </button>
          </div>
        </div>

        {message ? (
          <div
            style={{
              marginTop: 14,
              padding: "12px 14px",
              borderRadius: 12,
              border:
                messageType === "success"
                  ? "1px solid rgba(34,197,94,0.45)"
                  : "1px solid rgba(239,68,68,0.45)",
              background:
                messageType === "success"
                  ? "rgba(34,197,94,0.12)"
                  : "rgba(239,68,68,0.10)",
            }}
          >
            {message}
          </div>
        ) : null}

        <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
          {loading ? (
            <div style={cardStyle}>Loading jobs…</div>
          ) : jobs.length === 0 ? (
            <div style={cardStyle}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>No jobs posted yet.</div>
              <div style={{ marginTop: 10 }}>
                <Link href="/pro/dashboard" style={{ ...grayBtn, textDecoration: "none", display: "inline-block" }}>
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            jobs.map((job) => {
              const currentStatus = statusByJobId[job.id] || "open";
              const alreadyClaimed = claimedJobIds.has(job.id);
              const isClaiming = claimingJobId === job.id;

              return (
                <div key={job.id} style={cardStyle}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 18, fontWeight: 900 }}>{job.title || "Untitled job"}</div>

                      {job.description ? (
                        <div style={{ marginTop: 8, color: "rgba(226,232,240,0.92)" }}>
                          {job.description}
                        </div>
                      ) : null}

                      <div style={{ marginTop: 10, fontSize: 13, opacity: 0.9 }}>
                        <div>
                          <strong>Category:</strong> {job.category || "—"}{" "}
                          <span style={{ opacity: 0.55 }}>•</span>{" "}
                          <strong>Location:</strong> {job.location || "—"}
                        </div>
                        <div style={{ marginTop: 4 }}>
                          <strong>Posted:</strong> {fmtDate(job.created_at)}
                        </div>
                      </div>

                      <div style={{ marginTop: 12, fontSize: 13, fontWeight: 800 }}>Job Status</div>

                      {/* DROPDOWN */}
                      <select
                        value={currentStatus}
                        style={selectStyle}
                        onChange={(e) => changeStatus(job.id, e.target.value)}
                      >
                        {STATUSES.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                      <div style={pillStyle}>{(currentStatus || "open").toUpperCase()}</div>

                      <button
                        type="button"
                        onClick={() => claimJob(job.id)}
                        disabled={alreadyClaimed || isClaiming}
                        style={{
                          ...greenBtn,
                          opacity: alreadyClaimed || isClaiming ? 0.55 : 1,
                          cursor: alreadyClaimed || isClaiming ? "not-allowed" : "pointer",
                          minWidth: 120,
                        }}
                      >
                        {alreadyClaimed ? "Claimed" : isClaiming ? "Claiming..." : "Claim Job"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div style={{ marginTop: 22, opacity: 0.7, fontSize: 12 }}>
          Tip: If the page looks “stuck”, do a hard refresh: <strong>Ctrl + Shift + R</strong>
        </div>
      </div>
    </div>
  );
}
