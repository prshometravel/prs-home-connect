"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function ProRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // optional to display
  const [phone, setPhone] = useState("");
  const [license, setLicense] = useState("");
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [sessionEmail, setSessionEmail] = useState<string>("");
  const [sessionUserId, setSessionUserId] = useState<string>("");

  // ✅ Always load session on page load
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      const sess = data.session;

      if (sess?.user) {
        setSessionEmail(sess.user.email || "");
        setSessionUserId(sess.user.id || "");
      } else {
        setSessionEmail("");
        setSessionUserId("");
      }
    };

    load();

    // Also listen for changes (sign in/out)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (newSession?.user) {
        setSessionEmail(newSession.user.email || "");
        setSessionUserId(newSession.user.id || "");
      } else {
        setSessionEmail("");
        setSessionUserId("");
      }
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    // ✅ check session (most reliable)
    const { data } = await supabase.auth.getSession();
    const sess = data.session;

    if (!sess?.user) {
      setMsg("You must be signed in to create a pro profile.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("pros").insert([
        {
          user_id: sess.user.id, // IMPORTANT: link to auth user
          name: name.trim() || null,
          email: (email.trim() || sess.user.email || null),
          phone: phone.trim() || null,
          license: license.trim() || null,
          location: location.trim() || null,
          specialty: specialty.trim() || null,
          experience: experience.trim() || null,
        },
      ]);

      if (error) {
        setMsg(`Error submitting form: ${error.message}`);
      } else {
        setMsg("✅ Pro profile created!");
        // optional: clear fields
        // setName(""); setEmail(""); setPhone(""); setLicense(""); setLocation(""); setSpecialty(""); setExperience("");
      }
    } catch (err: any) {
      setMsg(`Error submitting form: ${err?.message || "Unknown error"}`);
    }

    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setMsg("Signed out.");
  };

  // Basic inline styles to match your theme
  const page = {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    padding: 30,
    display: "flex",
    justifyContent: "center",
  } as const;

  const card = {
    width: "100%",
    maxWidth: 820,
    background: "#111827",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: 24,
  } as const;

  const label = { display: "block", fontWeight: 700, marginBottom: 6 } as const;

  const input = {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "#0b1220",
    color: "white",
    outline: "none",
  } as const;

  const textarea = { ...input, minHeight: 120 } as const;

  const row = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 } as const;

  const btnGreen = {
    background: "#22c55e",
    color: "#052e12",
    fontWeight: 800,
    border: "none",
    borderRadius: 10,
    padding: "12px 16px",
    cursor: "pointer",
  } as const;

  const btnGhost = {
    background: "transparent",
    color: "white",
    fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 10,
    padding: "12px 16px",
    cursor: "pointer",
  } as const;

  const msgStyle = {
    marginTop: 12,
    padding: "10px 12px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
  } as const;

  return (
    <main style={page}>
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28 }}>Create Pro Profile</h1>
            <div style={{ opacity: 0.85, marginTop: 6 }}>
              Signed in as:{" "}
              <b>{sessionEmail ? sessionEmail : "❌ Not signed in"}</b>
              {sessionUserId ? <span style={{ opacity: 0.6 }}> (uid: {sessionUserId.slice(0, 8)}…)</span> : null}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/signin" style={{ ...btnGhost, textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
              Sign in
            </Link>
            <button onClick={signOut} style={btnGhost} type="button">
              Sign out
            </button>
          </div>
        </div>

        <form onSubmit={submit} style={{ marginTop: 18 }}>
          <div style={row}>
            <div>
              <label style={label}>Name</label>
              <input style={input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your business / name" />
            </div>

            <div>
              <label style={label}>Email</label>
              <input style={input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Optional (will use signed-in email)" />
            </div>
          </div>

          <div style={{ height: 14 }} />

          <div style={row}>
            <div>
              <label style={label}>Phone</label>
              <input style={input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="706..." />
            </div>

            <div>
              <label style={label}>License (optional)</label>
              <input style={input} value={license} onChange={(e) => setLicense(e.target.value)} placeholder="Optional" />
            </div>
          </div>

          <div style={{ height: 14 }} />

          <div style={row}>
            <div>
              <label style={label}>Location</label>
              <input style={input} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Snellville, GA" />
            </div>

            <div>
              <label style={label}>Specialty</label>
              <select style={input as any} value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                <option value="">Select a specialty</option>
                <option value="Home Improvement">Home Improvement</option>
                <option value="Handyman">Handyman</option>
                <option value="TV Mounting">TV Mounting</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Moving">Moving</option>
                <option value="Security">Security</option>
              </select>
            </div>
          </div>

          <div style={{ height: 14 }} />

          <div>
            <label style={label}>Experience</label>
            <textarea
              style={textarea}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Tell customers about your experience..."
            />
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 16, alignItems: "center" }}>
            <button style={btnGreen} type="submit" disabled={loading}>
              {loading ? "Saving..." : "Create Profile"}
            </button>

            <Link href="/" style={{ color: "#93c5fd", fontWeight: 700 }}>
              ← Back Home
            </Link>
          </div>

          {msg ? <div style={msgStyle}>{msg}</div> : null}
        </form>
      </div>
    </main>
  );
}
