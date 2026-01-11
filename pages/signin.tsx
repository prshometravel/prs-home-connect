"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const page = {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "40px 16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  } as const;

  const card = {
    width: "100%",
    maxWidth: 520,
    background: "#111827",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: 18,
  } as const;

  const title = { fontSize: 26, fontWeight: 800, marginBottom: 6 } as const;
  const subtitle = { opacity: 0.85, marginBottom: 18 } as const;

  const label = { display: "block", fontWeight: 700, marginBottom: 6 } as const;

  const input = {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "#0b1220",
    color: "white",
    outline: "none",
  } as const;

  const btnGreen = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.2)",
    background: "linear-gradient(90deg, #16a34a, #22c55e)",
    color: "#05110a",
    fontWeight: 900,
    cursor: "pointer",
    marginTop: 12,
  } as const;

  const msgStyle = {
    marginTop: 12,
    padding: 10,
    borderRadius: 10,
    background: "rgba(34,197,94,0.12)",
    border: "1px solid rgba(34,197,94,0.25)",
    color: "#bbf7d0",
    fontWeight: 700,
  } as const;

  const errStyle = {
    marginTop: 12,
    padding: 10,
    borderRadius: 10,
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.25)",
    color: "#fecaca",
    fontWeight: 700,
  } as const;

  const onSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    if (!email.trim()) return setMsg("Email is required.");
    if (!password.trim()) return setMsg("Password is required.");

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    // Check role and route them
    const role = (data.user?.user_metadata as any)?.role;

    if (role === "pro") router.push("/pro/register");
    else router.push("/jobs/new");
  };

  return (
    <main style={page}>
      <div style={card}>
        <div style={title}>Sign in</div>
        <div style={subtitle}>Access your account.</div>

        <form onSubmit={onSignin}>
          <div style={{ marginBottom: 12 }}>
            <label style={label}>Email</label>
            <input style={input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={label}>Password</label>
            <input
              style={input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
          </div>

          <button type="submit" style={btnGreen} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {msg && (
            <div style={msg.toLowerCase().includes("invalid") || msg.toLowerCase().includes("confirm") ? errStyle : msgStyle}>
              {msg}
            </div>
          )}
        </form>

        <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/signup" style={{ color: "#93c5fd", fontWeight: 800 }}>
            Need an account? Sign up
          </Link>
          <Link href="/" style={{ color: "#93c5fd", fontWeight: 800 }}>
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
