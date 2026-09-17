import type { NextConfig } from "next";

// Most photography is local (public/photos), ported into the repo from
// D'Stella's real project photos. Admin-uploaded gallery photos live in
// Supabase Storage instead (see lib/supabase/gallery.ts), hence this host.
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
};

export default nextConfig;
