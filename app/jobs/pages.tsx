"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Job = {
  id: number;
  title: string;
  description: string | null;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("id, title, description")
        .order("id", { ascending: false });

      if (!error && data) {
        setJobs(data);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <main style={{ padding: "20px" }}>
      <h1>Available Jobs</h1>

      {jobs.length === 0 && <p>No jobs posted yet.</p>}

      {jobs.map((job) => (
        <div key={job.id} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
        </div>
      ))}
    </main>
  );
}
	
