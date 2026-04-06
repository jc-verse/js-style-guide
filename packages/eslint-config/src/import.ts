import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig({
  plugins: {
    import: importPlugin,
  },
  rules: {
    // We use @typescript-eslint/no-import-type-side-effects
    "import/consistent-type-specifier-style": "off",

    // This rule reports when using esModuleInterop
    "import/default": "off",

    // Enable if you use Webpack
    "import/dynamic-import-chunkname": 0,

    "import/enforce-node-protocol-usage": ["error", "always"],

    "import/export": "error",

    "import/exports-last": "off",

    "import/extensions": "off",

    "import/first": ["error", "absolute-first"],

    // We want the opposite style
    "import/group-exports": "off",

    "import/max-dependencies": "off",

    // Performance
    "import/named": "off",

    // Performance
    "import/namespace": "off",

    "import/newline-after-import": [
      "error",
      { considerComments: true, count: 1, exactCount: true },
    ],

    // Don't do absolute, even when authoring modules directly sent to browsers!
    "import/no-absolute-path": [
      "error",
      { amd: true, commonjs: true, esmodule: true },
    ],

    // We don't use AMD
    "import/no-amd": "error",

    // Anonymous functions/classes are already covered by func-names
    "import/no-anonymous-default-export": "off",

    "import/no-commonjs": "off",

    // Performance, and cycles are generally not an issue until they are
    "import/no-cycle": "off",

    // Please use default export for React components
    "import/no-default-export": "off",

    "import/no-deprecated": "off",

    "import/no-duplicates": [
      "error",
      { considerQueryString: true, "prefer-inline": true },
    ],

    "import/no-dynamic-require": "off",

    "import/no-empty-named-blocks": "error",

    "import/no-extraneous-dependencies": [
      "error",
      {
        bundledDependencies: false,
        devDependencies: ["**/*.test.{js,ts,jsx,tsx}"],
        optionalDependencies: false,
        peerDependencies: true,
      },
    ],

    // If you have to do this, it must be for some weird reason
    "import/no-import-module-exports": "warn",

    "import/no-internal-modules": "off",

    // The only reason to use this is when the environment doesn't handle this
    // compliantly
    "import/no-mutable-exports": "off",

    // Performance
    "import/no-named-as-default": "off",

    // Performance
    "import/no-named-as-default-member": "off",

    "import/no-named-default": "error",

    "import/no-named-export": "off",

    "import/no-namespace": "off",

    "import/no-nodejs-modules": "off",

    "import/no-relative-packages": "warn",

    "import/no-relative-parent-imports": "off",

    "import/no-restricted-paths": 0,

    "import/no-self-import": "error",

    "import/no-unassigned-import": "off",

    "import/no-unresolved": "off",

    "import/no-unused-modules": 0,

    // Going one directory above ensures transpilation doesn't mess with paths
    "import/no-useless-path-segments": "off",

    // When we use it, it's useful.
    "import/no-webpack-loader-syntax": "off",

    "import/order": 0,

    "import/prefer-default-export": "off",

    "import/unambiguous": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".mjs"],
      },
    },
  },
});
