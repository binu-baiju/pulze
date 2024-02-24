module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  experimental: {
    serverActions: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["lh3.googleusercontent.com", "i.pravatar.cc"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/image/upload/**",
      },
    ],
  },
};
