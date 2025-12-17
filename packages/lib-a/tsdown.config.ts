import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: './src/preload/index.ts',
  outDir: './dist/preload',
  format: 'esm',
  dts: true,
  fixedExtension: false,
  unbundle: true,
})
