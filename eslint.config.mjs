// @ts-check

import jcRules from "eslint-config-jc";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  ...jcRules({
    node: true,
    react: true,
  }),
  {
    ignores: ["node_modules", "**/dist/", "**/build/", "**/.docusaurus/"],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ["**/rules/**.js"],
    rules: {
      "sort-keys": "warn",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
  },
);
