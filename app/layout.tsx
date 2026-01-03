import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRS Home Connect | PRS Home Improvement and Security LLC",
  description: "PRS Home Connect connects customers with trusted local professionals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            {/* Logo only (clickable) */}
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="PRS Home Connect"
                className="h-28 w-auto object-contain"
              />
            </Link>

            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link
                href="/jobs/post"
                className="rounded bg-black px-3 py-2 text-white"
              >
                Post a Job
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t bg-white">
  <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600 space-y-2 text-center">
    
    <div>
      <span className="font-medium">Sponsored by</span>{" "}
      <span className="font-semibold text-gray-800">
        Sista’s Compassionate Care Services, LLC
      </span>
    </div>

    <div>
      📞{" "}
      <a href="tel:17702985126" className="hover:underline">
        (770) 298-5126
      </a>
    </div>

    <div className="text-xs text-gray-400">
      © {new Date().getFullYear()} PRS Home Improvement and Security LLC
    </div>

  </div>
</footer>
	
  </body>
  </html>
 );
}
          

    
	
