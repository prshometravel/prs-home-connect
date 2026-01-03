"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ReviewPage() {
  const { jobid } = useParams();
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TEMP: just simulate submit (we’ll connect Supabase next)
    setTimeout(() => {
      alert("Review submitted successfully!");
      router.push("/");
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-xl font-bold mb-4">Leave a Review</h1>

      <p className="text-sm text-gray-500 mb-4">
        Job ID: {jobid}
      </p>

      <form onSubmit={submitReview} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border p-2 rounded"
          >
            <option value={5}>★★★★★ (5)</option>
            <option value={4}>★★★★ (4)</option>
            <option value={3}>★★★ (3)</option>
            <option value={2}>★★ (2)</option>
            <option value={1}>★ (1)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border p-2 rounded"
            rows={4}
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
	
