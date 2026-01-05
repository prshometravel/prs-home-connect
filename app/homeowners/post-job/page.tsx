"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabaseClient";

export default function PostJobPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const supabase = getSupabase();
    if (!supabase) {
      setMessage("Supabase is not configured on Vercel yet (missing env vars).");
      return;
    }

    if (!title.trim()) {
      setMessage("Title is required.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("jobs").insert([{ title: title.trim() }]);
    setLoading(false);

    if (error) setMessage(error.message);
    else {
      setTitle("");
      setMessage("✅ Job saved!");
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Post a Job</h1>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}

      <form onSubmit={submit} style={{ marginTop: 16 }}>
        <label style={{ display: "block", marginBottom: 6 }}>Job title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Install a ceiling fan"
          style={{ width: "100%", padding: 10 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: 12, padding: 10, width: "100%" }}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
