import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function NewJobPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = [
    "Home Cleaning",
    "Deep Cleaning",
    "Move In / Move Out Cleaning",
    "Handyman",
    "TV Mounting",
    "Furniture Assembly",
    "Electrical",
    "Lighting Installation",
    "Plumbing",
    "Drain Cleaning",
    "HVAC",
    "AC Repair",
    "Heating Repair",
    "Painting",
    "Drywall Repair",
    "Roofing",
    "Landscaping",
    "Lawn Care",
    "Tree Service",
    "Pressure Washing",
    "Security Systems",
    "Camera Installation",
    "Alarm Systems",
    "Moving Services",
    "Junk Removal",
    "Appliance Repair",
    "Home Inspection",
    "Locksmith",
    "Carpentry",
    "Flooring",
    "Tile Installation",
    "CNA / Caregiver",
    "Senior Care",
    "Personal Care Assistant",
  ];

  const submitJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!title || !category || !location) {
      setMessage("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("jobs").insert({
      title,
      category,
      location,
      description,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("✅ Job posted successfully!");
      setTitle("");
      setCategory("");
      setLocation("");
      setDescription("");
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        {/* GO BACK BUTTON */}
        <Link href="/" style={styles.goBack}>
          ← Go Back
        </Link>

        <div style={styles.brand}>
          <span style={styles.dot} />
          <div>
            <strong>PRS Home Connect</strong>
            <div style={styles.sub}>Post a Job</div>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <form onSubmit={submitJob} style={styles.card}>
          <h1 style={styles.title}>Describe your job</h1>
          <p style={styles.subtitle}>
            Homeowners post for free. Pros unlock leads starting at $10.
          </p>

          <input
            style={styles.input}
            placeholder="Job title (Example: TV Mounting)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            style={styles.input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            style={styles.input}
            placeholder="City, State (Atlanta, GA)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <textarea
            style={{ ...styles.input, height: 120 }}
            placeholder="Add details (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Posting..." : "Post Job"}
          </button>

          {message && <p style={styles.message}>{message}</p>}
        </form>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)",
    color: "#e5e7eb",
  },
  header: {
    position: "relative",
    borderBottom: "1px solid #1f2937",
    padding: "14px 20px",
  },
  goBack: {
    position: "absolute",
    top: 18,
    left: 20,
    color: "#9ca3af",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: "#22c55e",
    boxShadow: "0 0 0 6px rgba(34,197,94,0.2)",
  },
  sub: {
    fontSize: 12,
    color: "#9ca3af",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 16px",
  },
  card: {
    width: "100%",
    maxWidth: 560,
    background: "#020617",
    border: "1px solid #1f2937",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
  },
  title: {
    margin: 0,
    fontSize: 26,
    fontWeight: 800,
  },
  subtitle: {
    margin: "8px 0 20px",
    fontSize: 14,
    color: "#9ca3af",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: 14,
    borderRadius: 10,
    border: "1px solid #1f2937",
    background: "#020617",
    color: "#e5e7eb",
    fontSize: 14,
  },
  button: {
    width: "100%",
    padding: "14px",
    borderRadius: 12,
    border: "none",
    background: "#22c55e",
    color: "#052e16",
    fontWeight: 800,
    cursor: "pointer",
  },
  message: {
    marginTop: 12,
    textAlign: "center",
    color: "#22c55e",
    fontWeight: 600,
  },
};

