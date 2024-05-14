"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsup = require("tsup");
var _default = exports.default = (0, _tsup.defineConfig)({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  // Build for commonJS and ESmodules
  dts: true,
  // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true
});