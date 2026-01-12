import { useState } from "react";
import Link from "next/link";

export default function StripePayPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Stripe error");

      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <Link href="/" style={styles.back}>← Back Home</Link>
        <h3>PRS Home Connect – Stripe Test</h3>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h1>Pay $10 (Test Mode)</h1>
          <p>This is a safe Stripe test checkout.</p>

          <button onClick={startCheckout} disabled={loading} style={styles.btn}>
            {loading ? "Redirecting..." : "Pay $10"}
          </button>

          {error && <p style={styles.error}>{error}</p>}
        </div>
      </main>
    </div>
  );
}

const styles: any = {
  page: { minHeight: "100vh", background: "#020617", color: "#e5e7eb" },
  header: { padding: 16, borderBottom: "1px solid #1f2937" },
  back: { color: "#9ca3af", textDecoration: "none" },
  main: { display: "flex", justifyContent: "center", padding: 40 },
  card: { maxWidth: 500, width: "100%", background: "#020617", border: "1px solid #1f2937", borderRadius: 16, padding: 20 },
  btn: { marginTop: 14, width: "100%", padding: 14, background: "#22c55e", color: "#052e16", border: "none", borderRadius: 12, fontWeight: 900 },
  error: { marginTop: 12, color: "#fca5a5" },
};
	
