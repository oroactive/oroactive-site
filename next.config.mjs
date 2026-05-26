/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "app.oroactive.it" },
      { protocol: "https", hostname: "www.bullionvault.com" }
    ]
  },
  experimental: {
    optimizePackageImports: ["framer-motion"]
  }
};

export default nextConfig;
