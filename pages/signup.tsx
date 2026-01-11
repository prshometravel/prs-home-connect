"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const [role, setRole] = useState<"homeowner" | "pro">("homeowner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string>("");

  const page = {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as const;

  const card = {
    width: "100%",
    maxWidth: 560,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: 22,
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  } as const;

  const label = { display: "block", fontWeight: 700, marginBottom: 6 } as const;

  const input = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(0,0,0,0.25)",
    color: "white",
    outline: "none",
  } as const;

  const btnGreen = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.25)",
    background: "#22c55e",
    color: "#052e16",
    fontWeight: 900,
    cursor: "pointer",
    marginTop: 14,
    boxShadow: "0 10px 22px rgba(34,197,94,0.22)",
  } as const;

  const btnOutline = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "transparent",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
    marginTop: 10,
  } as const;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    if (!email.trim() || !password.trim()) {
      setMsg("Email and password are required.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
    });

    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    // If Supabase requires email confirmation, user may not be "authenticated" yet.
    // We still route them correctly after signup.
    if (role === "pro") {
      setMsg("Account created. Now create your Pro profile.");
      window.location.href = "/pro/register";
    } else {
      setMsg("Account created. Now post your first job.");
      window.location.href = "/jobs/new";
    }
  };

  return (
    <main style={page}>
      <div style={card}>
        <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 6 }}>
          Create Account
        </h1>
        <p style={{ opacity: 0.85, marginBottom: 18 }}>
          Homeowners post jobs for free. Pros unlock leads starting at $10.
        </p>

        <form onSubmit={submit}>
          <div style={{ marginBottom: 14 }}>
            <label style={label}>I am a</label>
            <select
              style={input}
              value={role}
              onChange={(e) => setRole(e.target.value as "homeowner" | "pro")}
            >
              <option value="homeowner">Homeowner</option>
              <option value="pro">Service Provider (Pro)</option>
            </select>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={label}>Email</label>
            <input
              style={input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
          </div>

          <div style={{ marginBottom: 6 }}>
            <label style={label}>Password</label>
            <input
              style={input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>

          <button style={btnGreen} type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>

          <Link href="/" style={{ textDecoration: "none" }}>
            <button type="button" style={btnOutline}>
              Back Home
            </button>
          </Link>

          {msg && (
            <div style={{ marginTop: 12, color: "#fca5a5", fontWeight: 700 }}>
              {msg}
            </div>
          )}
        </form>

        <div style={{ marginTop: 16, opacity: 0.9 }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#22c55e", fontWeight: 900 }}>
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
