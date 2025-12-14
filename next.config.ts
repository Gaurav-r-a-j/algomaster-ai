import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Turbopack config for raw .md imports
  turbopack: {
    rules: {
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
  // Webpack fallback for production builds
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: "asset/source",
    })
    return config
  },
}

export default nextConfig

