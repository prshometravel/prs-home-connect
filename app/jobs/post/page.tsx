"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

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

    setTitle("");
    setCategory("");
    setLocation("");
    setDescription("");
    setMessage("✅ Job posted!");
  };

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Post a Job</h1>
        <Link href="/jobs" style={{ textDecoration: "underline" }}>
          View Jobs
        </Link>
      </div>

      <form onSubmit={submit} style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          Title *
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Example: Mount a TV"
            style={{ padding: 10, border: "1px solid #ccc", borderRadius: 8 }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Category
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Example: TV Mounting"
            style={{ padding: 10, border: "1px solid #ccc", borderRadius: 8 }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Location
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Example: Atlanta, GA"
            style={{ padding: 10, border: "1px solid #ccc", borderRadius: 8 }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write details for the pro…"
            rows={5}
            style={{ padding: 10, border: "1px solid #ccc", borderRadius: 8 }}
          />
        </label>

        <button
          disabled={loading}
          type="submit"
          style={{
            padding: 12,
            borderRadius: 10,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 700,
          }}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>

        {message && (
          <p style={{ marginTop: 6, fontWeight: 600 }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
