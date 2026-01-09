import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>PRS Home Connect</h1>

      <nav style={{ marginBottom: 20 }}>
        <Link href="/">Home</Link> |{" "}
        <Link href="/jobs">Post a Job</Link> |{" "}
        <Link href="/pro/register">Pro Sign Up</Link>
      </nav>

      <p>Welcome to PRS Home Connect.</p>
    </div>
  );
}
	
