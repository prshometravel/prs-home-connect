import Link from "next/link";

export default function Success() {
  return (
    <div style={{ padding: 40, background: "#020617", minHeight: "100vh", color: "#e5e7eb" }}>
      <h1>✅ Payment Successful</h1>
      <p>Stripe test payment completed.</p>
      <Link href="/" style={{ color: "#22c55e" }}>Back Home</Link>
    </div>
  );
}
