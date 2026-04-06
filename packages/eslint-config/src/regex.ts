import regexPlugin from "eslint-plugin-regexp";
import { defineConfig } from "eslint/config";

export default defineConfig({
  plugins: {
    regexp: regexPlugin,
  },
  rules: {
    "regexp/confusing-quantifier": "error",

    "regexp/control-character-escape": "error",

    "regexp/grapheme-string-literal": "error",

    "regexp/hexadecimal-escape": ["error", "never"],

    "regexp/letter-case": [
      "error",
      {
        caseInsensitive: "lowercase",
        controlEscape: "uppercase",
        hexadecimalEscape: "lowercase",
        unicodeEscape: "lowercase",
      },
    ],

    "regexp/match-any": ["warn", { allows: ["dotAll", "[\\s\\S]"] }],

    "regexp/negation": "error",

    "regexp/no-contradiction-with-assertion": "error",

    "no-control-regex": "off",
    "regexp/no-control-character": "error",

    "regexp/no-dupe-characters-character-class": "error",

    "regexp/no-dupe-disjunctions": [
      "warn",
      {
        report: "all",
        reportExponentialBacktracking: "potential",
        reportUnreachable: "potential",
      },
    ],

    "regexp/no-empty-alternative": "error",

    "regexp/no-empty-capturing-group": "error",

    "no-empty-character-class": "off",
    "regexp/no-empty-character-class": "error",

    "regexp/no-empty-group": "error",

    "regexp/no-empty-lookarounds-assertion": "error",

    "regexp/no-empty-string-literal": "error",

    "regexp/no-escape-backspace": "warn",

    "regexp/no-extra-lookaround-assertions": "error",

    "no-invalid-regexp": "off",
    "regexp/no-invalid-regexp": "error",

    "regexp/no-invisible-character": "error",

    "regexp/no-lazy-ends": ["error", { ignorePartial: false }],

    "regexp/no-legacy-features": "error",

    "regexp/no-misleading-capturing-group": [
      "warn",
      { reportBacktrackingEnds: true },
    ],

    "no-misleading-character-class": "off",
    "regexp/no-misleading-unicode-character": ["error", { fixable: false }],

    "regexp/no-missing-g-flag": ["error", { strictTypes: true }],

    "regexp/no-non-standard-flag": "error",

    // This probably can be enabled, but it seems too disruptive
    "regexp/no-obscure-range": "off",

    "regexp/no-octal": "error",

    "regexp/no-optional-assertion": "error",

    "regexp/no-potentially-useless-backreference": "warn",

    "regexp/no-standalone-backslash": "error",

    "regexp/no-super-linear-backtracking": ["warn", { report: "potential" }],

    "regexp/no-super-linear-move": [
      "warn",
      { ignorePartial: false, ignoreSticky: false, report: "potential" },
    ],

    "regexp/no-trivially-nested-assertion": "error",

    "regexp/no-trivially-nested-quantifier": "error",

    "regexp/no-unused-capturing-group": [
      "warn",
      {
        allowNamed: false,
      },
    ],

    "regexp/no-useless-assertions": "error",

    "no-useless-backreference": "off",
    "regexp/no-useless-backreference": "error",

    "regexp/no-useless-character-class": ["error", { ignores: [] }],

    "regexp/no-useless-dollar-replacements": "error",

    "regexp/no-useless-escape": "error",

    "regexp/no-useless-flag": "error",

    "regexp/no-useless-lazy": "error",

    "regexp/no-useless-non-capturing-group": ["error", { allowTop: "never" }],

    "regexp/no-useless-quantifier": "error",

    "regexp/no-useless-range": "error",

    "regexp/no-useless-set-operand": "error",

    "regexp/no-useless-string-literal": "error",

    "regexp/no-useless-two-nums-quantifier": "error",

    "regexp/no-zero-quantifier": "error",

    "regexp/optimal-lookaround-quantifier": "error",

    "regexp/optimal-quantifier-concatenation": [
      "error",
      { capturingGroups: "report" },
    ],

    "regexp/prefer-character-class": ["error", { minAlternatives: 2 }],

    "regexp/prefer-d": ["error", { insideCharacterClass: "d" }],

    "regexp/prefer-escape-replacement-dollar-char": "error",

    "regexp/prefer-lookaround": ["error", { lookbehind: true }],

    "regexp/prefer-named-backreference": "error",

    "prefer-named-capture-group": "off",
    "regexp/prefer-named-capture-group": "warn",

    "regexp/prefer-named-replacement": "error",

    "regexp/prefer-plus-quantifier": "error",

    "regexp/prefer-predefined-assertion": "error",

    // We disable no-regex-spaces too
    "regexp/prefer-quantifier": "off",

    "regexp/prefer-question-quantifier": "error",

    "regexp/prefer-range": "error",

    // Shadowed by @typescript-eslint/prefer-regexp-exec
    "regexp/prefer-regexp-exec": "off",

    "regexp/prefer-regexp-test": "warn",

    "regexp/prefer-result-array-groups": "warn",

    "regexp/prefer-set-operation": "error",

    "regexp/prefer-star-quantifier": "error",

    "regexp/prefer-unicode-codepoint-escapes": "error",

    "regexp/prefer-w": "error",

    "require-unicode-regexp": "off",

    "regexp/require-unicode-regexp": "error",

    // Maybe in the future?
    "regexp/require-unicode-sets-regexp": "off",

    "regexp/simplify-set-operations": "error",

    "regexp/sort-alternatives": 0,

    "regexp/sort-character-class-elements": 0,

    "regexp/sort-flags": "error",

    "regexp/strict": "error",

    "regexp/unicode-escape": ["error", "unicodeEscape"],

    "regexp/unicode-property": [
      "error",
      {
        generalCategory: "never",
        key: "short",
        property: {
          binary: "long",
          generalCategory: "long",
          script: "long",
        },
      },
    ],

    "regexp/use-ignore-case": "error",
  },
});
