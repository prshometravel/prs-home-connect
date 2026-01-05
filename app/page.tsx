export default function HomeOwnersPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Home Owners
      </h1>

      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Post a job and connect with trusted local professionals for home
        improvement, cleaning, moving, security, and more.
      </p>

      {/* ACTION CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 mb-10">
        <a
          href="/post-job"
          className="border rounded-xl p-6 hover:bg-gray-50 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Post a Job
          </h2>
          <p className="text-sm text-gray-600">
            Tell us what you need done and receive help from local pros.
          </p>
        </a>

        <a
          href="/jobs"
          className="border rounded-xl p-6 hover:bg-gray-50 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Browse Jobs
          </h2>
          <p className="text-sm text-gray-600">
            View job requests and track activity on your postings.
          </p>
        </a>
      </div>

      {/* CATEGORIES */}
      <section className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">
          Services You Can Request
        </h3>

        <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
          <li>✔ Home Repairs & Maintenance</li>
          <li>✔ Cleaning Services</li>
          <li>✔ Moving & Hauling</li>
          <li>✔ Security & Smart Home</li>
          <li>✔ TV Mounting & Installations</li>
          <li>✔ EV Charger Installation</li>
        </ul>
      </section>
    </main>
  );
}
