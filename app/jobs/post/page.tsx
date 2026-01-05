"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PostJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!title.trim()) {
      setMessage("Job title is required.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("jobs").insert([
      {
        title,
        description,
      },
    ]);

    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Job posted successfully!");
      setTitle("");
      setDescription("");
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <Link href="/homeowners" className="text-sm text-gray-500">
        ← Back to Home Owners
      </Link>

      <h1 className="text-2xl font-bold mt-4 mb-4">
        Post a Job
      </h1>

      <form onSubmit={submitJob} className="space-y-4">
        <input
          type="text"
          placeholder="Job title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Describe the job"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          rows={4}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>

        {message && (
          <p className="text-sm text-gray-600">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
...

[Message clipped]  View entire message
PRS Home Improvement And Security LLC
	
11:43 AM (4 minutes ago)
	
	
to me
export default function HomeOwnersPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-4 text-center">
        Home Owners
      </h1>

      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Post a job and connect with trusted local professionals for home
        services, security, childcare, healthcare, and more.
      </p>

      {/* ACTION CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 mb-10">
        <a
          href="/jobs/post"
          className="border rounded-xl p-6 hover:bg-gray-50 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Post a Job
          </h2>
          <p className="text-sm text-gray-600">
            Describe what you need done and receive help from local pros.
          </p>
        </a>

        <a
          href="/jobs"
          className="border rounded-xl p-6 hover:bg-gray-50 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Browse Jobs
          </h2>
          <p className="text-sm text-gray-600">
            View job requests and manage your postings.
          </p>
        </a>
      </div>

      {/* SERVICES LIST */}
      <section className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">
          Services You Can Request
        </h3>

        <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
          {/* Home & Property */}
          <li>✔ Home Repairs & Maintenance</li>
          <li>✔ Cleaning Services</li>
          <li>✔ Moving & Hauling</li>
          <li>✔ TV Mounting & Installations</li>
          <li>✔ EV Charger Installation</li>
          <li>✔ Security & Smart Home</li>

          {/* Care & Support */}
          <li>✔ Adult Daycare Support</li>
          <li>✔ Child Babysitter Services</li>
          <li>✔ Healthcare Assistance</li>
          <li>✔ CNA Services</li>
          <li>✔ Nursing Help & Home Care</li>

          {/* General */}
          <li>✔ And More…</li>
        </ul>
      </section>
    </main>
  );
}
