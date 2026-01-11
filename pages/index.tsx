import Link from "next/link";

export default function HomePage() {
  const btnPrimary = {
    padding: "12px 22px",
    background: "#22c55e",
    color: "#022c22",
    borderRadius: 10,
    border: "none",
    fontWeight: 800,
    cursor: "pointer",
  };

  const btnSecondary = {
    padding: "12px 22px",
    background: "transparent",
    color: "white",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.25)",
    fontWeight: 700,
    cursor: "pointer",
  };

  const sponsorBox = {
    marginTop: 40,
    padding: 20,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px 20px",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 40,
        }}
      >
        <img
          src="/logo.png"
          alt="PRS Home Connect"
          style={{ height: 56 }}
        />
        <div>
          <strong>PRS Home Connect</strong>
          <div style={{ fontSize: 12, opacity: 0.8 }}>
            by PRS Home Improvement & Security LLC
          </div>
        </div>
      </div>

      {/* HERO */}
      <h1 style={{ fontSize: 36, maxWidth: 700 }}>
        A smarter way to connect homeowners & pros.
      </h1>

      <p style={{ maxWidth: 700, opacity: 0.85 }}>
        Homeowners post jobs for free. Professionals unlock leads starting
        at just $10. Chat, share photos, and get the job done.
      </p>

      {/* BUTTONS */}
      <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
        <Link href="/jobs/new" style={btnPrimary}>
          Post a Job (Free)
        </Link>

        <Link href="/pro/register" style={btnSecondary}>
          Join as a Pro
        </Link>

        <Link href="/jobs" style={btnSecondary}>
          View Available Jobs
        </Link>
      </div>

      {/* SPONSOR */}
      <div style={sponsorBox}>
        <div>
          <strong>Sponsored Provider</strong>
          <div style={{ marginTop: 6 }}>
            <strong>Sista’s Compassionate Care Services, LLC</strong>
          </div>
          <div style={{ fontSize: 14, opacity: 0.85 }}>
            Home care · companionship · personal care · errands
          </div>
          <div style={{ fontSize: 13, opacity: 0.7 }}>
            Snellville, GA
          </div>
        </div>

        <a
          href="tel:17702985126"
          style={{
            ...btnPrimary,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Call (770) 298-5126
        </a>
      </div>
    </div>
  );
}
