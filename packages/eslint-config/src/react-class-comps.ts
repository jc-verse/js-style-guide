import { defineConfig } from "eslint/config";

export default defineConfig({
  rules: {
    "react/no-access-state-in-setstate": "error",

    "react/no-arrow-function-lifecycle": "error",

    "react/no-did-mount-set-state": "error",

    "react/no-did-update-set-state": "error",

    "react/no-direct-mutation-state": "error",

    "react/no-redundant-should-component-update": "error",

    // ???
    "react/no-set-state": "off",

    "react/no-unsafe": "error",

    "react/no-unused-class-component-methods": "error",

    "react/no-unused-state": "error",

    "react/no-will-update-set-state": "error",

    "react/prefer-es6-class": "error",

    "react/prefer-stateless-function": "error",

    // We mostly use function components, and this optimization is not critical
    "react/require-optimization": "off",

    "react/require-render-return": "error",

    "react/sort-comp": 0,

    "react/state-in-constructor": ["error", "never"],

    "react/static-property-placement": ["error", "static public field"],
  },
});
