/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

declare module '*.md' {
  const attributes: Record<string, any>
  const html: string
  export { attributes, html }
}
