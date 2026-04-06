import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig({
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    react: reactPlugin,
    // @ts-expect-error: TODO
    "react-hooks": reactHooksPlugin,
  },
  rules: {
    "react-hooks/exhaustive-deps": "error",

    "react-hooks/rules-of-hooks": "error",

    "react/boolean-prop-naming": "off",

    "react/checked-requires-onchange-or-readonly": [
      "error",
      {
        ignoreExclusiveCheckedAttribute: false,
        ignoreMissingProperties: false,
      },
    ],

    // Sometimes we do need `props` as a whole, e.g. for spreading
    "react/destructuring-assignment": "off",

    // Isn't useful
    "react/display-name": "off",

    "react/forbid-component-props": 0,

    "react/forbid-dom-props": 0,

    "react/forbid-elements": 0,

    // No longer necessary; forwardRef is deprecated
    "react/forward-ref-uses-ref": "off",

    // Note that it false-positives for `const Foo: Comp = () => <></>`
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "function-declaration",
        unnamedComponents: "arrow-function",
      },
    ],

    "react/hook-use-state": ["error", { allowDestructuredState: true }],

    "react/jsx-fragments": ["error", "syntax"],

    // There can be false positives, such as an array that's not used as a
    // single child
    "react/jsx-key": [
      "error",
      {
        checkFragmentShorthand: true,
        // https://github.com/jsx-eslint/eslint-plugin-react/issues/2830
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],

    "react/jsx-no-bind": [
      "warn",
      {
        allowArrowFunctions: false,
        allowBind: false,
        allowFunctions: false,
        ignoreDOMComponents: true,
        ignoreRefs: true,
      },
    ],

    "react/jsx-no-constructed-context-values": "error",

    // We usually use automatic runtime
    "react/jsx-uses-react": 0,

    // In some cases this is fine (e.g. static websites)
    "react/no-array-index-key": "warn",

    "react/no-danger": "warn",

    "react/no-danger-with-children": "error",

    "react/no-deprecated": "error",

    // Deprecated API
    "react/no-find-dom-node": "error",

    // Deprecated API
    "react/no-is-mounted": "error",

    // It's useful for encapsulation.
    "react/no-multi-comp": "off",

    "react/no-namespace": "error",

    "react/no-object-type-as-default-prop": "warn",

    // ReactDOM.render itself is deprecated
    "react/no-render-return-value": "error",

    "react/no-string-refs": ["error", { noTemplateLiterals: true }],

    "react/no-this-in-sfc": "error",

    "react/no-typos": "error",

    "react/no-unstable-nested-components": ["warn", { allowAsProps: true }],

    "react/prefer-read-only-props": "warn",

    // Checked by TypeScript; we may also use JSX runtime
    "react/react-in-jsx-scope": "off",

    "react/state-in-constructor": "error",

    "react/static-property-placement": "off",

    // Also checked by TypeScript
    "react/style-prop-object": "error",
  },
  settings: {
    react: {
      pragma: "React",
      version: "18",
    },
  },
});
