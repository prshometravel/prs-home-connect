import Link from "next/link";

export default function Cancel() {
  return (
    <div style={{ padding: 40, background: "#020617", minHeight: "100vh", color: "#e5e7eb" }}>
      <h1>Payment Canceled</h1>
      <Link href="/stripe/pay" style={{ color: "#22c55e" }}>Try Again</Link>
    </div>
  );
}
