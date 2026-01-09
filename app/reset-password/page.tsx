"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Supabase recovery links use URL HASH tokens
  useEffect(() => {
    const handleRecovery = async () => {
      const hash = window.location.hash;

      if (!hash) {
        setMessage("Invalid or expired reset link. Please request a new one.");
        return;
      }

      const params = new URLSearchParams(hash.replace("#", ""));
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (!access_token || !refresh_token) {
        setMessage("Invalid or expired reset link. Please request a new one.");
        return;
      }

      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        setMessage("Reset link expired. Please request a new reset email.");
      }
    };

    handleRecovery();
  }, []);

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password updated successfully! Redirecting...");
    setTimeout(() => router.push("/sign-in"), 1200);
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ width: 420, padding: 24, border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>Set a new password</h1>

        <form onSubmit={updatePassword} style={{ display: "grid", gap: 12, marginTop: 16 }}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          {message && (
            <div style={{ background: "#fee2e2", padding: 10, borderRadius: 8 }}>
              {message}
            </div>
          )}

          <button disabled={loading}>
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>

        <div style={{ marginTop: 12 }}>
          <Link href="/forgot-password">Request new reset link</Link>
        </div>
      </div>
    </div>
  );
}
