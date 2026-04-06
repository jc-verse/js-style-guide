import { defineConfig } from "eslint/config";

export default defineConfig({
  rules: {
    // https://jc-verse.github.io/js-style-guide/typescript/type-checked#await-thenable
    "@typescript-eslint/await-thenable": "error",

    // Not worth turning on
    "@typescript-eslint/consistent-return": "off",

    // Also enforced by --isolatedModules
    // https://jc-verse.github.io/js-style-guide/typescript/type-checked#consistent-type-exports
    "@typescript-eslint/consistent-type-exports": [
      "error",
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],

    // https://jc-verse.github.io/js-style-guide/typescript/type-checked#dot-notation
    "@typescript-eslint/dot-notation": "off",

    // TODO figure out how this should be configured
    "@typescript-eslint/naming-convention": 0,

    "@typescript-eslint/no-base-to-string": [
      "warn",
      { ignoredTypeNames: ["RegExp", "Error"] },
    ],

    "@typescript-eslint/no-confusing-void-expression": [
      "error",
      {
        ignoreArrowShorthand: true,
        ignoreVoidOperator: false,
        ignoreVoidReturningFunctions: false,
      },
    ],

    "@typescript-eslint/no-deprecated": "warn",

    "@typescript-eslint/no-floating-promises": [
      "warn",
      {
        ignoreIIFE: false,
        ignoreVoid: true,
      },
    ],

    "@typescript-eslint/no-for-in-array": "error",

    "@typescript-eslint/no-meaningless-void-operator": "error",

    "@typescript-eslint/no-misused-promises": "error",

    "@typescript-eslint/no-redundant-type-constituents": "error",

    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",

    "@typescript-eslint/no-unnecessary-condition": [
      "error",
      { allowConstantLoopConditions: true, checkTypePredicates: true },
    ],

    // Enums & namespaces aren't allowed anyway.
    "@typescript-eslint/no-unnecessary-qualifier": "warn",

    "@typescript-eslint/no-unnecessary-type-arguments": "warn",

    "@typescript-eslint/no-unnecessary-type-assertion": "error",

    "@typescript-eslint/no-unsafe-argument": "error",

    "@typescript-eslint/no-unsafe-assignment": "error",

    "@typescript-eslint/no-unsafe-call": "error",

    "@typescript-eslint/no-unsafe-member-access": "error",

    "@typescript-eslint/no-unsafe-return": "error",

    // TODO: investigate enabling
    "@typescript-eslint/no-unsafe-type-assertion": "off",

    "@typescript-eslint/non-nullable-type-assertion-style": "error",

    "@typescript-eslint/prefer-includes": "error",

    // This has a significant number of false-positives.
    "@typescript-eslint/prefer-nullish-coalescing": "warn",

    // Isn't useful.
    "@typescript-eslint/prefer-readonly": "off",

    // Isn't useful. If there's a readonly-by-default tsconfig option we would
    // happily try it instead
    "@typescript-eslint/prefer-readonly-parameter-types": "off",

    "@typescript-eslint/prefer-reduce-type-parameter": "error",

    "@typescript-eslint/prefer-regexp-exec": "warn",

    "@typescript-eslint/prefer-return-this-type": "warn",

    "@typescript-eslint/prefer-string-starts-ends-with": [
      "warn",
      { allowSingleElementEquality: "never" },
    ],

    // Not useful. Sometimes we intentionally make the function non-async.
    "@typescript-eslint/promise-function-async": "off",

    // Allow flexible API design
    "@typescript-eslint/related-getter-setter-pairs": "off",

    "@typescript-eslint/require-array-sort-compare": "error",

    // Implicit casting is fine.
    "@typescript-eslint/restrict-plus-operands": "off",

    // Default options work fine. However, not allowing `never` is a pain
    "@typescript-eslint/restrict-template-expressions": [
      "warn",
      {
        allowAny: false,
        allowArray: false,
        allowBoolean: false,
        allowNullish: false,
        allowNumber: true,
        allowRegExp: false,
      },
    ],

    // TODO configure it properly
    "@typescript-eslint/strict-boolean-expressions": "off",

    "@typescript-eslint/switch-exhaustiveness-check": "error",

    // Not very useful in practice... A lot of false-positives
    "@typescript-eslint/unbound-method": "off",

    "@typescript-eslint/use-unknown-in-catch-callback-variable": "error",
  },
});
