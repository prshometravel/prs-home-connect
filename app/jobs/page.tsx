import Link from "next/link";

export default function JobsPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="mb-4">
        <Link href="/" className="text-sm underline">
          ← Back Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Jobs</h1>

      <p className="text-gray-600 mb-6">
        Browse available jobs or post a new one.  
        This page will show jobs from homeowners soon.
      </p>

      <div className="border rounded p-4 text-center text-gray-500">
        No jobs posted yet.
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/jobs/post"
          className="inline-block bg-black text-white px-4 py-2 rounded"
        >
          Post a Job
        </Link>
      </div>
    </main>
  );
}
