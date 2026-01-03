"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function PostJobPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

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
    } else {
      setMessage("Job posted successfully!");
      setTitle("");
      setCategory("");
      setLocation("");
      setDescription("");

      // Redirect to jobs list
      setTimeout(() => {
        router.push("/jobs");
      }, 800);
    }
  };

  return (
    <main style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Post a Job</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 20, display: "grid", gap: 14 }}>
        <input
          placeholder="Job title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
        />

        <input
          placeholder="Category (Cleaning, Moving, EV Charger, etc)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
        />

        <input
          placeholder="Location (City, State)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
        />

        <textarea
          placeholder="Job description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 12,
            borderRadius: 10,
            background: "#111827",
            color: "white",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: 14, color: message.includes("success") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </main>
  );
}
