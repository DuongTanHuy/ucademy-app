/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "hnn5b0yt0q.ufs.sh" },
    ],
  },
};

export default nextConfig;
