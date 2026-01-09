"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PostJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitJob = async (e: React.FormEvent) => {
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
        description: description.trim() || null,
      },
    ]);

    setLoading(false);

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setTitle("");
      setDescription("");
      setMessage("Job posted successfully ✅");
    }
  };

  return (
    <main style={{ padding: 20, maxWidth: 700 }}>
      <h1>Post a Job</h1>

      <form onSubmit={submitJob} style={{ marginTop: 16 }}>
        <label style={{ display: "block", marginBottom: 6 }}>Job Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Example: TV Mounting"
          style={{ width: "100%", padding: 10, marginBottom: 14 }}
        />

        <label style={{ display: "block", marginBottom: 6 }}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what the customer needs..."
          style={{ width: "100%", padding: 10, height: 120, marginBottom: 14 }}
        />

        <button type="submit" disabled={loading} style={{ padding: "10px 14px" }}>
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>

      {message && <p style={{ marginTop: 14 }}>{message}</p>}
    </main>
  );
}
	
