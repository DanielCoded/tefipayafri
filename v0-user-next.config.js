/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "v0.blob.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "upload.wikimedia.org",
    ],
  },
}

module.exports = nextConfig

