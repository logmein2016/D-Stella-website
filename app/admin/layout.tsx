import type { Metadata } from "next";

// robots.txt disallow keeps crawlers out but doesn't guarantee de-indexing
// if a URL is ever discovered via a link — this noindex tag is the more
// reliable way to keep the admin area out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
