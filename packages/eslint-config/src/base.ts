import { defineConfig } from "eslint/config";

export default defineConfig({
  rules: {
    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#accessor-pairs
    "accessor-pairs": [
      "error",
      {
        enforceForClassMembers: true,
        getWithoutSet: true,
        setWithoutGet: true,
      },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/collections#array-callback-return
    "array-callback-return": [
      "error",
      {
        allowImplicit: false,
        checkForEach: false,
        // Note: allowVoid doesn't do anything with checkForEach: false
      },
    ],

    // Only add braces with multiple statements
    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#arrow-body-style
    "arrow-body-style": [
      "error",
      "as-needed",
      {
        requireReturnForObjectLiteral: false,
      },
    ],

    // We forbid using var altogether.
    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#block-scoped-var
    "block-scoped-var": "error",

    // Properties are hard to check because they may come from other APIs
    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#camelcase
    camelcase: [
      "error",
      {
        allow: [],
        ignoreDestructuring: false,
        ignoreGlobals: false,
        ignoreImports: false,
        properties: "never",
      },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/formatting#capitalized-comments
    "capitalized-comments": [
      "warn",
      "always",
      {
        ignoreConsecutiveComments: true,
        ignoreInlineComments: false,
        ignorePattern: "prettier-ignore|cSpell:ignore",
      },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#class-methods-use-this
    "class-methods-use-this": "off",

    // I don't understand the point of this rule at all ㄟ(▔,▔)ㄏ
    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#complexity
    complexity: "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#consistent-return
    "consistent-return": ["error", { treatUndefinedAsUnspecified: false }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#consistent-this
    "consistent-this": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#constructor-super
    "constructor-super": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/formatting#curly
    curly: ["warn", "multi-or-nest", "consistent"],

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#default-case
    "default-case": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#default-case-last
    "default-case-last": "error",

    // Only enabled in TypeScript
    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#default-param-last
    "default-param-last": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#dot-notation
    "dot-notation": ["error", { allowKeywords: true }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#eqeqeq
    eqeqeq: ["error", "always", { null: "always" }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#for-direction
    "for-direction": "error",

    // We rarely use function expressions.
    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#func-name-matching
    "func-name-matching": [
      "warn",
      "always",
      { considerPropertyDescriptor: true, includeCommonJSModuleExports: false },
    ],

    // We rarely use function expressions.
    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#func-names
    "func-names": ["warn", "as-needed"],

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#func-style
    "func-style": [
      "warn",
      "declaration",
      { allowArrowFunctions: true, allowTypeAnnotation: false },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#getter-return
    "getter-return": ["error", { allowImplicit: false }],

    // It's also common to have all getters in one place and setters in another.
    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#grouped-accessor-pairs
    "grouped-accessor-pairs": "off",

    // We disallow using for-in altogether.
    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#guard-for-in
    "guard-for-in": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#id-denylist
    "id-denylist": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#id-length
    "id-length": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#id-match
    "id-match": "off",

    // Otherwise one can write `let a: string;` which can be problematic.
    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#init-declarations
    "init-declarations": ["error", "always"],

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#logical-assignment-operators
    "logical-assignment-operators": [
      "error",
      "always",
      { enforceForIfStatements: true },
    ],

    // Doesn't make sense in JS.
    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#max-classes-per-file
    "max-classes-per-file": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#max-depth
    "max-depth": "off",

    // We only check comments, since code width is already enforced by Prettier
    // https://jc-verse.github.io/js-style-guide/eslint-base/formatting#max-len
    "max-len": [
      "warn",
      {
        code: Infinity,
        comments: 80,
        ignorePattern: "(eslint-disable|@)",
        ignoreUrls: true,
        tabWidth: 2,
      },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#max-lines
    "max-lines": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#max-lines-per-function
    "max-lines-per-function": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#max-nested-callbacks
    "max-nested-callbacks": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#max-params
    "max-params": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#max-statements
    "max-statements": "off",

    // Single-line comments save lines.
    // https://jc-verse.github.io/js-style-guide/eslint-base/formatting#multiline-comment-style
    "multiline-comment-style": ["error", "separate-lines"],

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#new-cap
    "new-cap": ["error", { capIsNew: false, newIsCap: true, properties: true }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-alert
    "no-alert": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/collections#no-array-constructor
    "no-array-constructor": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/async#no-async-promise-executor
    "no-async-promise-executor": "error",

    // Whenever we write `await`, we actually want it to wait. We know what we
    // are doing.
    // https://jc-verse.github.io/js-style-guide/eslint-base/async#no-await-in-loop
    "no-await-in-loop": "off",

    // It's cool and useful. Why not?
    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-bitwise
    "no-bitwise": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#no-caller
    "no-caller": "error",

    // Requires `case x: {let a = 1;}`
    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-case-declarations
    "no-case-declarations": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#no-class-assign
    "no-class-assign": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-compare-neg-zero
    "no-compare-neg-zero": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-cond-assign
    "no-cond-assign": ["error", "always"],

    // In projects with a wrapped logger, this can be enabled
    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-console
    "no-console": 0,

    // Also checked by TypeScript
    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-const-assign
    "no-const-assign": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-constant-binary-expression
    "no-constant-binary-expression": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-constant-condition
    "no-constant-condition": ["error", { checkLoops: "all" }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#no-constructor-return
    "no-constructor-return": "error",

    // It's useful.
    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-continue
    "no-continue": "off",

    // Good to catch errors, but sometimes we actually want to match control
    // characters
    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-control-regex
    "no-control-regex": "warn",

    // I've personally never ever used this
    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-debugger
    "no-debugger": "error",

    // This is also a syntax error in strict mode
    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-delete-var
    "no-delete-var": "error",

    // This is a weird rule!
    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-div-regex
    "no-div-regex": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#no-dupe-args
    "no-dupe-args": "error",

    // Shadowed by TS-ESLint rule
    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#no-dupe-class-members
    "no-dupe-class-members": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-dupe-else-if
    "no-dupe-else-if": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#no-dupe-keys
    "no-dupe-keys": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-duplicate-case
    "no-duplicate-case": "error",

    // Shadowed by import-x/no-duplicates
    "no-duplicate-imports": "off",

    // `else-if` is able to save one line, and also makes the flow more natural.
    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-else-return
    "no-else-return": ["error", { allowElseIf: true }],

    // Empty catch is useful.
    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-empty
    "no-empty": ["error", { allowEmptyCatch: true }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-empty-character-class
    "no-empty-character-class": "error",

    // Sometimes we do want no-ops.
    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#no-empty-function
    "no-empty-function": "off",

    "no-empty-pattern": ["error", { allowObjectPatternsAsParameters: false }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#no-empty-static-block
    "no-empty-static-block": "error",

    // This is also checked by eqeqeq
    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-eq-null
    "no-eq-null": "error",

    // Never use eval!
    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-eval
    "no-eval": ["error", { allowIndirect: false }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-ex-assign
    "no-ex-assign": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-extend-native
    "no-extend-native": ["error", { exceptions: [] }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#no-extra-bind
    "no-extra-bind": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-extra-boolean-cast
    "no-extra-boolean-cast": ["error", { enforceForInnerExpressions: true }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-extra-label
    "no-extra-label": "error",

    // A eslint-disable is as expressive as a special comment.
    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-fallthrough
    "no-fallthrough": [
      "error",
      { allowEmptyCase: true, commentPattern: undefined },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#no-func-assign
    "no-func-assign": "error",

    // Handled by TS; there are far too many globals to list for ESLint
    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-global-assign
    "no-global-assign": "off",

    // Allow no implicit coercion
    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-implicit-coercion
    "no-implicit-coercion": [
      "error",
      {
        allow: [],
        boolean: true,
        disallowTemplateShorthand: true,
        number: true,
        string: true,
      },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-implicit-globals
    "no-implicit-globals": ["error", { lexicalBindings: true }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-implied-eval
    "no-implied-eval": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/modules#no-import-assign
    "no-import-assign": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/formatting#no-inline-comments
    "no-inline-comments": "off",

    // `var`s in blocks are checked by block-scoped-var; functions in blocks
    // behave as expected in strict mode.
    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#no-inner-declarations
    "no-inner-declarations": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-invalid-regexp
    "no-invalid-regexp": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#no-invalid-this
    "no-invalid-this": "off",

    // Irregular whitespace anywhere is prone to errors if people want to
    // retype it
    // https://jc-verse.github.io/js-style-guide/eslint-base/formatting#no-irregular-whitespace
    "no-irregular-whitespace": [
      "error",
      {
        skipComments: false,
        skipJSXText: false,
        skipRegExps: false,
        skipStrings: false,
        skipTemplates: false,
      },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-iterator
    "no-iterator": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-label-var
    "no-label-var": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-labels
    "no-labels": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-lone-blocks
    "no-lone-blocks": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-lonely-if
    "no-lonely-if": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#no-loop-func
    "no-loop-func": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-loss-of-precision
    "no-loss-of-precision": "error",

    // We prefer using comments in case the code is not self-explanatory
    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-magic-numbers
    "no-magic-numbers": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-misleading-character-class
    "no-misleading-character-class": ["error", { allowEscape: true }],

    // For aesthetic reasons, because Prettier formats chained assignments quite
    // ugly.
    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-multi-assign
    "no-multi-assign": ["error", { ignoreNonDeclaration: false }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-multi-str
    "no-multi-str": "error",

    // This is a useful rule, but too hard to enforce in practice. Sometimes
    // negated conditions actually make more sense
    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-negated-condition
    "no-negated-condition": "off",

    // Nested ternaries are formatted by Prettier and not hard to understand.
    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-nested-ternary
    "no-nested-ternary": "off",

    // Note that this rule can actually be useful if we are testing if a
    // constructor throws, the most representative case being `new URL()`
    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#no-new
    "no-new": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-new-func
    "no-new-func": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-new-native-nonconstructor
    "no-new-native-nonconstructor": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-new-wrappers
    "no-new-wrappers": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-nonoctal-decimal-escape
    "no-nonoctal-decimal-escape": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-obj-calls
    "no-obj-calls": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-object-constructor
    "no-object-constructor": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-octal
    "no-octal": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-octal-escape
    "no-octal-escape": "error",

    // If we reassign params, we actually need to.
    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#no-param-reassign
    "no-param-reassign": "off",

    // Plusplus is concise and useful.
    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-plusplus
    "no-plusplus": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/async#no-promise-executor-return
    "no-promise-executor-return": ["error", { allowVoid: false }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-proto
    "no-proto": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-prototype-builtins
    "no-prototype-builtins": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-redeclare
    "no-redeclare": ["error", { builtinGlobals: true }],

    // Multiple spaces can resemble constructs that readers are familiar with
    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-regex-spaces
    "no-regex-spaces": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/modules#no-restricted-exports
    "no-restricted-exports": 0,

    // Taken from airbnb
    "no-restricted-globals": [
      "error",
      {
        message:
          "Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite",
        name: "isFinite",
      },
      {
        message:
          "Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan",
        name: "isNaN",
      },
      "addEventListener",
      "blur",
      "close",
      "closed",
      "confirm",
      "defaultStatus",
      // cSpell:ignore defaultstatus
      "defaultstatus",
      "event",
      "external",
      "find",
      "focus",
      "frameElement",
      "frames",
      "history",
      "innerHeight",
      "innerWidth",
      "length",
      "location",
      "locationbar",
      "menubar",
      "moveBy",
      "moveTo",
      "name",
      "onblur",
      "onerror",
      "onfocus",
      "onload",
      "onresize",
      "onunload",
      "open",
      "opener",
      "opera",
      "outerHeight",
      "outerWidth",
      "pageXOffset",
      "pageYOffset",
      "parent",
      "print",
      "removeEventListener",
      "resizeBy",
      "resizeTo",
      "screen",
      "screenLeft",
      "screenTop",
      "screenX",
      "screenY",
      "scroll",
      "scrollbars",
      "scrollBy",
      "scrollTo",
      "scrollX",
      "scrollY",
      "self",
      "status",
      "statusbar",
      "stop",
      "toolbar",
      "top",
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/modules#no-restricted-imports
    "no-restricted-imports": 0,

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-restricted-properties
    "no-restricted-properties": 0,

    "no-restricted-syntax": [
      "warn",
      // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#use-of-for-in
      {
        message:
          "for...in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
        selector: "ForInStatement",
      },
      // https://jc-verse.github.io/js-style-guide/eslint-base/operators#use-of-in
      {
        message:
          "The in operator checks properties in the entire prototype chain, which is easily hackable. Use Object.hasOwn instead, or refactor your object to a map.",
        selector: "BinaryExpression[operator='in']",
      },
      // https://jc-verse.github.io/js-style-guide/eslint-base/modules#use-of-export-
      {
        message:
          "Export all does't work well if imported in ESM due to how they are transpiled, and they can also lead to unexpected exposure of internal methods.",
        selector: "ExportAllDeclaration",
      },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-return-assign
    "no-return-assign": ["error", "always"],

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-script-url
    "no-script-url": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-self-assign
    "no-self-assign": ["error", { props: true }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-self-compare
    "no-self-compare": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-sequences
    "no-sequences": ["error", { allowInParentheses: false }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#no-setter-return
    "no-setter-return": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-shadow
    "no-shadow": [
      "warn",
      {
        allow: [],
        builtinGlobals: false,
        hoist: "all",
        ignoreFunctionTypeParameterNameValueShadow: false,
        ignoreOnInitialization: true,
        ignoreTypeValueShadow: true,
      },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-shadow-restricted-names
    "no-shadow-restricted-names": ["error", { reportGlobalThis: true }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/collections#no-sparse-arrays
    "no-sparse-arrays": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-template-curly-in-string
    "no-template-curly-in-string": "warn",

    // We like ternaries.
    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-ternary
    "no-ternary": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#no-this-before-super
    "no-this-before-super": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-throw-literal
    "no-throw-literal": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-unassigned-vars
    "no-unassigned-vars": "error",

    // We also check for `typeof`, because it simply doesn't make sense
    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-undef
    "no-undef": ["error", { typeof: true }],

    // We require every variable to be explicitly initialized. See also
    // init-declarations
    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-undef-init
    "no-undef-init": "off",

    // Undefined is obviously useful
    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-undefined
    "no-undefined": "off",

    // Dangling underscores are often from other APIs
    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-underscore-dangle
    "no-underscore-dangle": "off",

    // Since we require semi, this shouldn't happen a lot
    // https://jc-verse.github.io/js-style-guide/eslint-base/formatting#no-unexpected-multiline
    "no-unexpected-multiline": "error",

    // There can be false-positives, but it's more useful than not
    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-unmodified-loop-condition
    "no-unmodified-loop-condition": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-unneeded-ternary
    "no-unneeded-ternary": ["error", { defaultAssignment: false }],

    // Also checked by TypeScript
    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-unreachable
    "no-unreachable": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-unreachable-loop
    "no-unreachable-loop": ["error", { ignore: [] }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-unsafe-finally
    "no-unsafe-finally": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-unsafe-negation
    "no-unsafe-negation": ["error", { enforceForOrderingRelations: true }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-unsafe-optional-chaining
    "no-unsafe-optional-chaining": [
      "error",
      { disallowArithmeticOperators: true },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-unused-expressions
    "no-unused-expressions": [
      "error",
      {
        // We allow logical operators to be used for control flow
        allowShortCircuit: true,
        // Tagged templates can have side effects, e.g. logging
        allowTaggedTemplates: true,
        allowTernary: true,
        enforceForJSX: true,
        // Only for completeness; the parser already strips directives in ES5+
        ignoreDirectives: true,
      },
    ],

    // Also checked by TypeScript
    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-unused-labels
    "no-unused-labels": "error",

    // Also checked by TypeScript
    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#no-unused-private-class-members
    "no-unused-private-class-members": "error",

    // Also checked by TypeScript
    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-unused-vars
    "no-unused-vars": [
      "error",
      {
        args: "after-used",
        caughtErrors: "all",
        ignoreClassWithStaticInitBlock: false,
        ignoreRestSiblings: true,
        ignoreUsingDeclarations: false,
        vars: "all",
      },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-use-before-define
    "no-use-before-define": [
      "error",
      {
        allowNamedExports: true,
        classes: true,
        enums: false,
        functions: false,
        ignoreTypeReferences: true,
        typedefs: false,
        variables: true,
      },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-useless-assignment
    "no-useless-assignment": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-useless-backreference
    "no-useless-backreference": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#no-useless-call
    "no-useless-call": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-useless-catch
    "no-useless-catch": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#no-useless-computed-key
    "no-useless-computed-key": ["error", { enforceForClassMembers: true }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-useless-concat
    "no-useless-concat": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#no-useless-constructor
    "no-useless-constructor": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#no-useless-escape
    "no-useless-escape": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-useless-rename
    "no-useless-rename": [
      "error",
      { ignoreDestructuring: false, ignoreExport: false, ignoreImport: false },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#no-useless-return
    "no-useless-return": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#no-var
    "no-var": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#no-void
    "no-void": ["error", { allowAsStatement: true }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/formatting#no-warning-comments
    "no-warning-comments": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#no-with
    "no-with": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#object-shorthand
    "object-shorthand": [
      "error",
      "always",
      {
        avoidExplicitReturnArrows: true,
        avoidQuotes: false,
        ignoreConstructors: false,
      },
    ],

    // Too stylistic.
    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#one-var
    "one-var": "off",

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#operator-assignment
    "operator-assignment": ["error", "always"],

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#prefer-arrow-callback
    "prefer-arrow-callback": [
      "error",
      { allowNamedFunctions: false, allowUnboundThis: true },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#prefer-const
    "prefer-const": [
      "error",
      { destructuring: "any", ignoreReadBeforeAssign: false },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#prefer-destructuring
    "prefer-destructuring": [
      "error",
      { array: true, object: true },
      { enforceForRenamedProperties: false },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#prefer-exponentiation-operator
    "prefer-exponentiation-operator": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#prefer-named-capture-group
    "prefer-named-capture-group": "warn",

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#prefer-numeric-literals
    "prefer-numeric-literals": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#prefer-object-has-own
    "prefer-object-has-own": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/objects-classes#prefer-object-spread
    "prefer-object-spread": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/async#prefer-promise-reject-errors
    "prefer-promise-reject-errors": ["error", { allowEmptyReject: false }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#prefer-regex-literals
    "prefer-regex-literals": ["error", { disallowRedundantWrapping: true }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#prefer-rest-params
    "prefer-rest-params": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/functions#prefer-spread
    "prefer-spread": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#prefer-template
    "prefer-template": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/control-flow#preserve-caught-error
    "preserve-caught-error": ["error", { requireCatchParameter: false }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#radix
    radix: "error",

    // There can be false-positives
    // https://jc-verse.github.io/js-style-guide/eslint-base/async#require-atomic-updates
    "require-atomic-updates": ["warn", { allowProperties: false }],

    // This can also be a way to help future refactors, where one of the
    // constituents is planned to be made async
    // https://jc-verse.github.io/js-style-guide/eslint-base/async#require-await
    "require-await": "warn",

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#require-unicode-regexp
    "require-unicode-regexp": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/async#require-yield
    "require-yield": "warn",

    "sort-imports": "off",

    "sort-keys": "off",

    "sort-vars": "off",

    // Copied from airbnb
    // https://jc-verse.github.io/js-style-guide/eslint-base/formatting#spaced-comment
    "spaced-comment": [
      "error",
      "always",
      {
        block: {
          balanced: true,
          exceptions: [],
          // Space here to support sprockets directives and flow comment types
          markers: ["=", "!", ":", "::"],
        },
        line: {
          exceptions: [],
          // Space here to support sprockets directives, slash for /// comments
          markers: ["=", "!", "/"],
        },
      },
    ],

    // We don't write much plain JS, but this is good enough
    // https://jc-verse.github.io/js-style-guide/eslint-base/modules#strict
    strict: ["error", "global"],

    // https://jc-verse.github.io/js-style-guide/eslint-base/literals#symbol-description
    "symbol-description": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#use-isnan
    "use-isnan": [
      "error",
      { enforceForIndexOf: true, enforceForSwitchCase: true },
    ],

    // https://jc-verse.github.io/js-style-guide/eslint-base/operators#valid-typeof
    "valid-typeof": ["error", { requireStringLiterals: true }],

    // https://jc-verse.github.io/js-style-guide/eslint-base/variables-names#vars-on-top
    "vars-on-top": "error",

    // https://jc-verse.github.io/js-style-guide/eslint-base/operatorss#yoda
    yoda: ["error", "never", { exceptRange: true }],
  },
});
