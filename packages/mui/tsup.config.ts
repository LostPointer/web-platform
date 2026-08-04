import { defineConfig } from 'tsup'

/**
 * `tsconfig.json` keeps `composite: true` for the root `tsc -b` project
 * reference graph. tsup's isolated `.d.ts` bundling step (rollup-plugin-dts)
 * doesn't honor project-reference file lists the way `tsc -b` does, and
 * throws TS6307 ("file not listed within the file list of project") for any
 * locally-imported file once `composite` is on — this package is the first
 * with a multi-file `src/` import graph, so this didn't surface earlier.
 * Overriding `composite`/`incremental` off for this one build step avoids
 * that, without weakening the real `tsc -b` composite build.
 */
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  clean: true,
  dts: {
    compilerOptions: {
      composite: false,
      incremental: false,
    },
  },
})
