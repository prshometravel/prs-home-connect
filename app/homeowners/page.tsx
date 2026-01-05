export default function HomeOwnersPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Home Owners
      </h1>

      <p className="text-gray-600 mb-6">
        Post a job and connect with trusted local professionals.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href="/post-job"
          className="border rounded-lg p-4 hover:bg-gray-50"
        >
          <h2 className="font-semibold">Post a Job</h2>
          <p className="text-sm text-gray-600">
            Describe what you need done.
          </p>
        </a>

        <a
          href="/jobs"
          className="border rounded-lg p-4 hover:bg-gray-50"
        >
          <h2 className="font-semibold">Browse Jobs</h2>
          <p className="text-sm text-gray-600">
            View recent job requests.
          </p>
        </a>
      </div>
    </main>
  );
}
