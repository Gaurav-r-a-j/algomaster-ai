import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Enable MDX pages
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

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
