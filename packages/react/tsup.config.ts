import { defineConfig } from 'tsup'

/**
 * See packages/mui/tsup.config.ts for why `composite`/`incremental` are
 * overridden off for this dts build step: this package has a multi-file
 * `src/` import graph, and tsup's isolated dts bundling step throws TS6307
 * under the root `tsc -b` composite project references otherwise.
 */
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    styles: 'src/styles.css',
  },
  format: ['esm'],
  clean: true,
  dts: {
    compilerOptions: {
      composite: false,
      incremental: false,
    },
  },
})
