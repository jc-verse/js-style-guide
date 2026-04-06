import { defineConfig } from "eslint/config";
import type { ConfigWithExtendsArray } from "@eslint/config-helpers";
import tseslintParser from "@typescript-eslint/parser";
import prettierRules from "eslint-config-prettier";

import baseRules from "./base.js";
import regexRules from "./regex.js";
import typescriptRules from "./typescript.js";
import importRules from "./import.js";
import reactRules from "./react.js";
import jsxRules from "./jsx.js";

import typescriptTypeCheckRules from "./typescript-typecheck.js";
import nodeRules from "./node.js";
import reactClassCompRules from "./react-class-comps.js";
import reactPropTypesRules from "./react-prop-types.js";

function expandConfig(
  config: ConfigWithExtendsArray,
  enabled: undefined | boolean | (string[] | string)[],
): ConfigWithExtendsArray {
  if (enabled === true) return config;
  if (!enabled) return [];
  return config.map((v) => ({ files: enabled, ...v }));
}

export default function configCreator({
  react,
  typescriptTypeCheck,
  node,
  reactClassComp,
  reactPropTypes,
}: {
  react?: boolean | (string[] | string)[];
  typescriptTypeCheck?: boolean | (string[] | string)[];
  node?: boolean | (string[] | string)[];
  reactClassComp?: boolean | (string[] | string)[];
  reactPropTypes?: boolean | (string[] | string)[];
} = {}): ConfigWithExtendsArray {
  return defineConfig(
    {
      linterOptions: { reportUnusedDisableDirectives: true },
      languageOptions: { ecmaVersion: "latest", parser: tseslintParser },
    },
    prettierRules,
    ...baseRules,
    ...regexRules,
    ...typescriptRules,
    ...importRules,
    ...expandConfig([...reactRules, ...jsxRules], react),
    ...expandConfig(typescriptTypeCheckRules, typescriptTypeCheck),
    ...expandConfig(nodeRules, node),
    ...expandConfig(reactClassCompRules, reactClassComp),
    ...expandConfig(reactPropTypesRules, reactPropTypes),
  );
}
