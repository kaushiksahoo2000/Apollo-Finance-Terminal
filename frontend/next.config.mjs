/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      //all images
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

export default nextConfig
