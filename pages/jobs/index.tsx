import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Job = {
  id: string | number;
  title: string;
  category: string | null;
  location: string | null;
  description: string | null;
  created_at?: string | null;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const loadJobs = async () => {
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase
      .from("jobs")
      .select("id,title,category,location,description,created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      setErrorMsg(error.message);
      setJobs([]);
    } else {
      setJobs((data as Job[]) || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      if (j.category) set.add(j.category);
    });
    return ["", ...Array.from(set).sort()];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    if (!categoryFilter) return jobs;
    return jobs.filter((j) => (j.category || "") === categoryFilter);
  }, [jobs, categoryFilter]);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <Link href="/" style={styles.goBack}>
          ← Go Back
        </Link>

        <div style={styles.brand}>
          <span style={styles.dot} />
          <div>
            <strong>PRS Home Connect</strong>
            <div style={styles.sub}>View Available Jobs</div>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.topRow}>
            <h1 style={styles.title}>Available Jobs</h1>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={loadJobs} style={styles.secondaryBtn}>
                Refresh
              </button>

              <Link href="/jobs/new" style={{ textDecoration: "none" }}>
                <button style={styles.button}>+ Post a Job</button>
              </Link>
            </div>
          </div>

          {/* Dropdown Filter */}
          <div style={styles.filterRow}>
            <label style={styles.label}>Filter by Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={styles.input}
            >
              <option value="">All Categories</option>
              {categories
                .filter((c) => c !== "")
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </div>

          {loading && <p style={styles.muted}>Loading jobs…</p>}

          {!loading && errorMsg && (
            <div style={styles.alert}>
              <div style={{ fontWeight: 900, marginBottom: 6 }}>
                Couldn’t load jobs
              </div>
              <div style={styles.muted}>{errorMsg}</div>
              <div style={{ marginTop: 10, ...styles.muted }}>
                If you see “RLS” or “permission denied”, Supabase is blocking
                SELECT for the public.
              </div>
            </div>
          )}

          {!loading && !errorMsg && filteredJobs.length === 0 && (
            <div style={styles.empty}>
              <div style={{ fontWeight: 900 }}>No jobs found.</div>
              <div style={styles.muted}>
                Post one at <b>/jobs/new</b> then come back.
              </div>
            </div>
          )}

          {!loading && !errorMsg && filteredJobs.length > 0 && (
            <div style={styles.list}>
              {filteredJobs.map((job) => (
                <div key={job.id} style={styles.jobCard}>
                  <div style={styles.jobTop}>
                    <div style={styles.jobTitle}>{job.title}</div>
                    <span style={styles.pill}>{job.category || "General"}</span>
                  </div>

                  <div style={styles.muted}>
                    {job.location || "Location not provided"}
                  </div>

                  {job.description && (
                    <div style={styles.desc}>{job.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)",
    color: "#e5e7eb",
  },
  header: {
    position: "relative",
    borderBottom: "1px solid #1f2937",
    padding: "14px 20px",
  },
  goBack: {
    position: "absolute",
    top: 18,
    left: 20,
    color: "#9ca3af",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: "#22c55e",
    boxShadow: "0 0 0 6px rgba(34,197,94,0.2)",
  },
  sub: { fontSize: 12, color: "#9ca3af" },
  main: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 16px",
  },
  card: {
    width: "100%",
    maxWidth: 950,
    background: "#020617",
    border: "1px solid #1f2937",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  title: { margin: 0, fontSize: 24, fontWeight: 900 },
  muted: { color: "#9ca3af", fontSize: 13 },

  filterRow: {
    marginTop: 14,
    display: "grid",
    gap: 8,
    maxWidth: 420,
  },
  label: { fontSize: 12, color: "#9ca3af", fontWeight: 700 },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: 10,
    border: "1px solid #1f2937",
    background: "#020617",
    color: "#e5e7eb",
    fontSize: 14,
  },

  list: { display: "grid", gap: 12, marginTop: 16 },
  jobCard: {
    border: "1px solid #1f2937",
    borderRadius: 14,
    padding: 14,
    background: "#0b1220",
  },
  jobTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  jobTitle: { fontWeight: 900 },
  desc: { marginTop: 8, color: "#e5e7eb" },
  pill: {
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(34,197,94,0.15)",
    border: "1px solid rgba(34,197,94,0.35)",
    color: "#86efac",
    fontSize: 12,
    fontWeight: 800,
    whiteSpace: "nowrap",
  },
  button: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "none",
    background: "#22c55e",
    color: "#052e16",
    fontWeight: 900,
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #1f2937",
    background: "#020617",
    color: "#e5e7eb",
    fontWeight: 800,
    cursor: "pointer",
  },
  empty: {
    marginTop: 16,
    padding: 14,
    borderRadius: 14,
    border: "1px dashed #1f2937",
    background: "#0b1220",
  },
  alert: {
    marginTop: 16,
    padding: 14,
    borderRadius: 14,
    border: "1px solid rgba(239,68,68,0.35)",
    background: "rgba(239,68,68,0.10)",
  },
};
	
