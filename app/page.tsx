"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Job = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  location: string | null;
  created_at: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      setJobs(Array.isArray(data) ? data : []);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Available Jobs
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && jobs.length === 0 && (
        <p className="text-gray-500">No jobs posted yet.</p>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded">
            <h3 className="font-semibold">{job.title}</h3>

            {job.description && (
              <p className="text-gray-600">{job.description}</p>
            )}

            <p className="text-sm text-gray-500">
              {job.category} • {job.location}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

