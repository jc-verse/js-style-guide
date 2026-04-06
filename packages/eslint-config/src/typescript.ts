import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    plugins: {
      // @ts-expect-error: TODO
      "@typescript-eslint": tseslintPlugin,
    },
    rules: {
      // Only enabled in TypeScript
      // https://jc-verse.github.io/js-style-guide/eslint-base/functions#default-param-last
      "default-param-last": "off",

      // https://jc-verse.github.io/js-style-guide/typescript/base#adjacent-overload-signatures
      "@typescript-eslint/adjacent-overload-signatures": "error",

      // I wish this rule can be more flexible to allow T[] where T is a union
      // https://jc-verse.github.io/js-style-guide/typescript/base#adjacent-overload-signatures
      "@typescript-eslint/array-type": [
        "error",
        { default: "array", readonly: "array" },
      ],

      // https://jc-verse.github.io/js-style-guide/typescript/base#ban-ts-comment
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          minimumDescriptionLength: 3,
          "ts-check": false,
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": true,
        },
      ],

      // We've never used TSLint anyway
      // https://jc-verse.github.io/js-style-guide/typescript/base#ban-tslint-comment
      "@typescript-eslint/ban-tslint-comment": "error",

      // https://jc-verse.github.io/js-style-guide/typescript/base#class-literal-property-style
      "@typescript-eslint/class-literal-property-style": ["warn", "getters"],

      // https://jc-verse.github.io/js-style-guide/typescript/base#consistent-generic-constructors
      "@typescript-eslint/consistent-generic-constructors": [
        "error",
        "constructor",
      ],

      // https://jc-verse.github.io/js-style-guide/typescript/base#consistent-indexed-object-style
      "@typescript-eslint/consistent-indexed-object-style": [
        "error",
        "index-signature",
      ],

      // https://jc-verse.github.io/js-style-guide/typescript/base#consistent-type-assertions
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "as", objectLiteralTypeAssertions: "allow" },
      ],

      // We sometimes allow declaration merging
      // https://jc-verse.github.io/js-style-guide/typescript/base#consistent-type-definitions
      "@typescript-eslint/consistent-type-definitions": "off",

      // https://jc-verse.github.io/js-style-guide/typescript/base#consistent-type-imports
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          disallowTypeAnnotations: false,
          fixStyle: "inline-type-imports",
          prefer: "type-imports",
        },
      ],

      // No—too verbose
      // https://jc-verse.github.io/js-style-guide/typescript/base#explicit-function-return-type
      "@typescript-eslint/explicit-function-return-type": "off",

      // Defaulting to public makes sense
      // https://jc-verse.github.io/js-style-guide/typescript/base#explicit-member-accessibility
      "@typescript-eslint/explicit-member-accessibility": "off",

      // https://jc-verse.github.io/js-style-guide/typescript/base#explicit-module-boundary-types
      "@typescript-eslint/explicit-module-boundary-types": "warn",

      // TODO figure out how this should be configured
      "@typescript-eslint/member-ordering": 0,

      // https://jc-verse.github.io/js-style-guide/typescript/base#method-signature-style
      "@typescript-eslint/method-signature-style": ["error", "property"],

      // TODO
      "@typescript-eslint/naming-convention": 0,

      // https://jc-verse.github.io/js-style-guide/typescript/base#no-confusing-non-null-assertion
      "@typescript-eslint/no-confusing-non-null-assertion": "error",

      // This can be useful for dynamic object transformations
      // https://jc-verse.github.io/js-style-guide/typescript/base#no-dynamic-delete
      "@typescript-eslint/no-dynamic-delete": "off",

      // https://jc-verse.github.io/js-style-guide/typescript/base#no-empty-object-type
      "@typescript-eslint/no-empty-object-type": [
        "warn",
        {
          allowInterfaces: "with-single-extends",
          allowObjectTypes: "never",
        },
      ],

      // https://jc-verse.github.io/js-style-guide/typescript/base#no-explicit-any
      "@typescript-eslint/no-explicit-any": "warn",

      // https://jc-verse.github.io/js-style-guide/typescript/base#no-extra-non-null-assertion
      "@typescript-eslint/no-extra-non-null-assertion": "error",

      // https://jc-verse.github.io/js-style-guide/typescript/base#no-extraneous-class
      "@typescript-eslint/no-extraneous-class": [
        "warn",
        {
          allowConstructorOnly: false,
          allowEmpty: false,
          allowStaticOnly: false,
          allowWithDecorator: false,
        },
      ],

      // https://jc-verse.github.io/js-style-guide/typescript/base#no-import-type-side-effects
      "@typescript-eslint/no-import-type-side-effects": "error",

      // Annotating parameters makes the code more uniform
      "@typescript-eslint/no-inferrable-types": [
        "error",
        { ignoreParameters: true },
      ],

      // https://jc-verse.github.io/js-style-guide/typescript/base#no-invalid-void-type
      "@typescript-eslint/no-invalid-void-type": [
        "warn",
        { allowAsThisParameter: false, allowInGenericTypeArguments: true },
      ],

      // https://jc-verse.github.io/js-style-guide/typescript/base#no-misused-new
      "@typescript-eslint/no-misused-new": "error",

      // Use namespaces to organize your code
      // https://jc-verse.github.io/js-style-guide/typescript/base#no-namespace
      "@typescript-eslint/no-namespace": "off",

      // https://jc-verse.github.io/js-style-guide/typescript/base#no-non-null-asserted-nullish-coalescing
      "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",

      // https://jc-verse.github.io/js-style-guide/typescript/base#no-non-null-asserted-optional-chain
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",

      // It's useful.
      // https://jc-verse.github.io/js-style-guide/typescript/base#no-non-null-assertion
      "@typescript-eslint/no-non-null-assertion": "off",

      "no-redeclare": "off",
      // https://jc-verse.github.io/js-style-guide/typescript/base#no-redeclare

      "@typescript-eslint/no-redeclare": [
        "error",
        {
          builtinGlobals: true,
          // We also allow redeclaring between variables and types although the
          // rule doesn't allow that
          ignoreDeclarationMerge: true,
        },
      ],

      // https://jc-verse.github.io/js-style-guide/typescript/base#no-require-imports
      "@typescript-eslint/no-require-imports": "error",

      // https://jc-verse.github.io/js-style-guide/typescript/base#no-this-alias
      "@typescript-eslint/no-this-alias": [
        "warn",
        { allowDestructuring: true, allowedNames: [] },
      ],

      // Deprecated
      "@typescript-eslint/no-type-alias": "off",

      // https://jc-verse.github.io/js-style-guide/typescript/base#no-unnecessary-type-constraint
      "@typescript-eslint/no-unnecessary-type-constraint": "error",

      "no-unused-vars": "off",
      // https://jc-verse.github.io/js-style-guide/typescript/base#no-unused-vars

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          caughtErrors: "all",
          ignoreRestSiblings: true,
          vars: "all",
        },
      ],

      // https://jc-verse.github.io/js-style-guide/typescript/base#no-useless-empty-export
      "@typescript-eslint/no-useless-empty-export": "error",

      // https://jc-verse.github.io/js-style-guide/typescript/base#parameter-properties
      "@typescript-eslint/parameter-properties": [
        "warn",
        { allow: [], prefer: "class-property" },
      ],

      // https://jc-verse.github.io/js-style-guide/typescript/base#prefer-as-const
      "@typescript-eslint/prefer-as-const": "error",

      // https://jc-verse.github.io/js-style-guide/typescript/base#prefer-enum-initializers
      "@typescript-eslint/prefer-enum-initializers": "error",

      // https://jc-verse.github.io/js-style-guide/typescript/base#prefer-for-of
      "@typescript-eslint/prefer-for-of": "error",

      // https://jc-verse.github.io/js-style-guide/typescript/base#prefer-function-type
      "@typescript-eslint/prefer-function-type": "error",

      // https://jc-verse.github.io/js-style-guide/typescript/base#prefer-literal-enum-member
      "@typescript-eslint/prefer-literal-enum-member": [
        "warn",
        { allowBitwiseExpressions: true },
      ],

      // https://jc-verse.github.io/js-style-guide/typescript/base#prefer-namespace-keyword
      "@typescript-eslint/prefer-namespace-keyword": "error",

      "@typescript-eslint/sort-type-constituents": 0,

      // https://jc-verse.github.io/js-style-guide/typescript/base#triple-slash-reference
      "@typescript-eslint/triple-slash-reference": [
        "error",
        { lib: "never", path: "never", types: "prefer-import" },
      ],

      // We use strict TS options instead.
      // https://jc-verse.github.io/js-style-guide/typescript/base#typedef
      "@typescript-eslint/typedef": "off",

      // https://jc-verse.github.io/js-style-guide/typescript/base#unified-signatures
      "@typescript-eslint/unified-signatures": [
        "warn",
        { ignoreDifferentlyNamedParameters: false },
      ],
    },
  },
  {
    files: ["**/*.{js,cjs,mjs,jsx}"],
    rules: {
      "default-param-last": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx,cts,mts}"],
    rules: {
      // Use TypeScript's checker instead
      "no-undef": "off",
    },
  },
);
