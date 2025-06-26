import type { Options } from 'tsdown'

export default <Options> {
  entry: [
    "./src/index.ts"
  ],
  clean: true,
  format: ["esm","cjs"],
  dts: true,
  minify: true,
  // compatible with __dirname in cjs and import.meta.url in mjs.
  shims: true
}