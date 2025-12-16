// TypeScript declarations for importing markdown/MDX content files as raw strings

declare module "*.md" {
  const content: string
  export default content
}

declare module "*.mdx" {
  const content: string
  export default content
}
