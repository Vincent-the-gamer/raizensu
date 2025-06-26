import type { Options } from 'tsdown'

export default <Options> {
  entry: [
    "./src/{index, cli}.ts"
  ],
  clean: true,
  format: ["esm"],
  dts: true,
  minify: true,
  // compatible with __dirname in cjs and import.meta.url in mjs.
  shims: true
}