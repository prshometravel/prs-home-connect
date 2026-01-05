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
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!title.trim()) {
      setMessage("Title is required.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("jobs").insert([
      {
        title: title.trim(),
        category: category.trim() || null,
        location: location.trim() || null,
        description: description.trim() || null,
      },
    ]);

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Job posted successfully!");
    setTitle("");
    setCategory("");
    setLocation("");
    setDescription("");
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <Link href="/homeowners" className="text-sm text-gray-500">
        ← Back to Home Owners
      </Link>

      <h1 className="text-2xl font-bold mt-4 mb-4">Post a Job</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job title (required)"
          className="w-full border p-2 rounded"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (optional)"
          className="w-full border p-2 rounded"
        />

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (optional)"
          className="w-full border p-2 rounded"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the job (optional)"
          className="w-full border p-2 rounded"
          rows={5}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>

        {message && <p className="text-sm text-gray-700">{message}</p>}
      </form>
    </main>
  );
}
