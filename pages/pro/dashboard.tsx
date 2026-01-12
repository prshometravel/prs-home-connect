import Link from "next/link";

export default function ProDashboard() {
  return (
    <div style={{ padding: "24px", background: "#0f172a", minHeight: "100vh", color: "white" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Pro Dashboard
      </h1>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Link href="/pro/jobs">
          <button style={btnStyle}>View Available Jobs</button>
        </Link>

        <Link href="/pro/register">
          <button style={btnStyle}>Edit Pro Profile</button>
        </Link>

        <Link href="/">
          <button style={btnStyleSecondary}>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

const btnStyle = {
  background: "#22c55e",
  color: "black",
  padding: "12px 18px",
  borderRadius: "8px",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
};

const btnStyleSecondary = {
  background: "#334155",
  color: "white",
  padding: "12px 18px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};
