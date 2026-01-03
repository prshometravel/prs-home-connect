"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Job = {
  job_id: string;
  title: string;
  category: string | null;
  location: string | null;
  description: string | null;
  created_at: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [paidJobIds, setPaidJobIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const { data: jobsData } = await supabase
        .from("jobs")
        .select("job_id,title,category,location,description,created_at")
        .order("created_at", { ascending: false });

      const j = (jobsData ?? []) as Job[];
      setJobs(j);

      const ids = j.map((x) => x.job_id);

      if (ids.length === 0) {
        setPaidJobIds([]);
        setLoading(false);
        return;
      }

      const { data: payData } = await supabase
        .from("payments")
        .select("job_id")
        .in("job_id", ids)
        .eq("status", "paid");

      setPaidJobIds((payData ?? []).map((p) => p.job_id));
      setLoading(false);
    };

    load();
  }, []);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h1>Available Jobs</h1>
        <Link href="/post-job">Post a Job</Link>
      </div>

      {loading && <p>Loading…</p>}

      {jobs.map((job) => {
        const unlocked = paidJobIds.includes(job.job_id);

        return (
          <div
            key={job.job_id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <h3>{job.title}</h3>

            <p>
              {job.category ?? "—"} {job.location ? `• ${job.location}` : ""}
            </p>

            {job.description && <p>{job.description}</p>}

            <strong>{unlocked ? "Unlocked 🔓" : "Locked 🔒"}</strong>
          </div>
        );
      })}
    </main>
  );
}
