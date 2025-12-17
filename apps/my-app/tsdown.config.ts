import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: './src/index.ts',
  outDir: './dist',
  format: 'esm',
  fixedExtension: false,
  unbundle: false, // expect "workspace:*" to be bundled
  noExternal: ['@pkg/lib-a'], // not work
  // noExternal: ['@pkg/lib-a/preload'], // worked
})
