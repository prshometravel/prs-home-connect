export default function Home() {
  return (
    <main style={{ padding: "40px", textAlign: "center" }}>
      <h1>PRS Home Connect</h1>
      <p>Connecting homeowners with trusted local professionals.</p>

      <div style={{ marginTop: "30px" }}>
        <a
          href="/homeowners"
          style={{
            padding: "12px 20px",
            background: "#111",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
          }}
        >
          Homeowners
        </a>
      </div>

      <footer style={{ marginTop: "60px", fontSize: "14px", color: "#666" }}>
        © 2026 PRS Home Improvement and Security LLC
      </footer>
    </main>
  );
}
	
