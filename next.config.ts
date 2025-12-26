import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Enable MDX pages
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // Security headers (additional to middleware)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Download-Options",
            value: "noopen",
          },
        ],
      },
    ]
  },

  // Turbopack - load MDX/MD files as raw strings for client-side rendering
  turbopack: {
    rules: {
      "*.mdx": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },

  // Webpack config for production
  webpack: (config) => {
    // Load MDX/MD files as raw strings
    config.module.rules.push({
      test: /\.mdx?$/,
      type: "asset/source",
    })
    return config
  },
}

export default nextConfig
