// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/farspeak.ts"],
    format: ["esm"],
    dts: true,
    sourcemap: true, // Generate source maps
    outDir: "dist",
    splitting: false, // Disable code splitting
    clean: true, // Clean the output directory before each build
    // minify: true, // Minify the output
  },
  {
    entry: ["src/farspeak.cjs.ts"],
    format: ["cjs"],
    dts: true,
    sourcemap: true, // Generate source maps
    outDir: "dist",
    splitting: false, // Disable code splitting
    clean: true, // Clean the output directory before each build
    // minify: true, // Minify the output
  },
]);
