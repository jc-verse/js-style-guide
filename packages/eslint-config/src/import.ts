import importPlugin from "eslint-plugin-import-x";
import { defineConfig } from "eslint/config";

export default defineConfig({
  plugins: { "import-x": importPlugin },
  rules: {
    // We use @typescript-eslint/no-import-type-side-effects
    "import-x/consistent-type-specifier-style": "off",

    // This rule reports when using esModuleInterop
    "import-x/default": "off",

    // Enable if you use Webpack
    "import-x/dynamic-import-chunkname": 0,

    "import-x/export": "error",

    "import-x/exports-last": "off",

    "import-x/extensions": "off",

    "import-x/first": ["error", "absolute-first"],

    // We want the opposite style
    "import-x/group-exports": "off",

    "import-x/max-dependencies": "off",

    // Performance
    "import-x/named": "off",

    // Performance
    "import-x/namespace": "off",

    "import-x/newline-after-import": [
      "error",
      { considerComments: true, count: 1, exactCount: true },
    ],

    // Don't do absolute, even when authoring modules directly sent to browsers!
    "import-x/no-absolute-path": [
      "error",
      { amd: true, commonjs: true, esmodule: true },
    ],

    // We don't use AMD
    "import-x/no-amd": "error",

    // Anonymous functions/classes are already covered by func-names
    "import-x/no-anonymous-default-export": "off",

    "import-x/no-commonjs": "off",

    // Performance, and cycles are generally not an issue until they are
    "import-x/no-cycle": "off",

    // Please use default export for React components
    "import-x/no-default-export": "off",

    "import-x/no-deprecated": "off",

    "import-x/no-duplicates": [
      "error",
      { considerQueryString: true, "prefer-inline": true },
    ],

    "import-x/no-dynamic-require": "off",

    "import-x/no-empty-named-blocks": "error",

    "import-x/no-extraneous-dependencies": [
      "error",
      {
        bundledDependencies: false,
        devDependencies: [
          "**/*.test.{js,ts,jsx,tsx}",
          "**/eslint.config.{js,ts,mjs,mts}",
        ],
        optionalDependencies: false,
        peerDependencies: true,
      },
    ],

    // If you have to do this, it must be for some weird reason
    "import-x/no-import-module-exports": "warn",

    "import-x/no-internal-modules": "off",

    // The only reason to use this is when the environment doesn't handle this
    // compliantly
    "import-x/no-mutable-exports": "off",

    // Performance
    "import-x/no-named-as-default": "off",

    // Performance
    "import-x/no-named-as-default-member": "off",

    "import-x/no-named-default": "error",

    "import-x/no-named-export": "off",

    "import-x/no-namespace": "off",

    "import-x/no-nodejs-modules": "off",

    "import-x/no-relative-packages": "warn",

    "import-x/no-relative-parent-imports": "off",

    "import-x/no-restricted-paths": 0,

    "import-x/no-self-import": "error",

    "import-x/no-unassigned-import": "off",

    "import-x/no-unresolved": "off",

    "import-x/no-unused-modules": 0,

    // Going one directory above ensures transpilation doesn't mess with paths
    "import-x/no-useless-path-segments": "off",

    // When we use it, it's useful.
    "import-x/no-webpack-loader-syntax": "off",

    "import-x/order": 0,

    "import-x/prefer-default-export": "off",

    "import-x/unambiguous": "off",
  },
  settings: {
    "import-x/resolver": {
      node: { extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".mjs"] },
    },
  },
});
