import Link from "next/link";

export default function JobsPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Post a Job</h1>

      <nav style={{ marginBottom: 20 }}>
        <Link href="/">Home</Link> |{" "}
        <Link href="/jobs">Post a Job</Link> |{" "}
        <Link href="/pro/register">Pro Sign Up</Link>
      </nav>

      <p>Jobs page is working.</p>
    </div>
  );
}

