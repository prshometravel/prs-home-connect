"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const redirectTo = `${window.location.origin}/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo,
    });

    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg("Reset link sent. Check your inbox (and spam).");
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: 420, maxWidth: "100%", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, background: "white" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Reset your password</h1>
        <p style={{ marginTop: 0, marginBottom: 14, color: "#6b7280" }}>
          Enter your email and we’ll send a password reset link.
        </p>

        <form onSubmit={send} style={{ display: "grid", gap: 12 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontSize: 12, color: "#374151" }}>Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ padding: 10, borderRadius: 10, border: "1px solid #d1d5db" }}
              autoComplete="email"
              required
            />
          </label>

          {msg && (
            <div style={{ padding: 10, borderRadius: 10, background: "#f3f4f6", fontSize: 13 }}>
              {msg}
            </div>
          )}

          <button
            disabled={loading}
            style={{
              padding: 11,
              borderRadius: 10,
              border: "1px solid #111827",
              background: "#111827",
              color: "white",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <div style={{ marginTop: 14, fontSize: 13, color: "#6b7280" }}>
          <Link href="/sign-in">Back to sign in</Link>
        </div>
      </div>
    </div>
  );
}
