import { defineConfig } from 'tsup'
export default defineConfig({ entry: ['src/index.ts'], format: ['esm'], clean: true, dts: { compilerOptions: { composite: false, incremental: false } } })
