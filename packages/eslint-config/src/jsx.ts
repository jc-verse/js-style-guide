import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig({
  plugins: {
    "jsx-a11y": jsxA11yPlugin,
    react: reactPlugin,
  },
  rules: {
    // JSX a11y rules are taken from airbnb, not adjusted yet
    "jsx-a11y/alt-text": [
      "error",
      {
        area: [],
        elements: ["img", "object", "area", 'input[type="image"]'],
        img: [],
        'input[type="image"]': [],
        object: [],
      },
    ],

    "jsx-a11y/anchor-ambiguous-text": [
      "warn",
      {
        // Default
        words: ["click here", "here", "link", "a link", "learn more"],
      },
    ],

    "jsx-a11y/anchor-has-content": [
      "error",
      {
        aspects: ["noHref", "invalidHref", "preferButton"],
        components: ["Link"],
        specialLink: ["to"],
      },
    ],

    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        aspects: ["noHref", "invalidHref", "preferButton"],
        components: ["Link"],
        specialLink: ["to"],
      },
    ],

    "jsx-a11y/aria-activedescendant-has-tabindex": "error",

    "jsx-a11y/aria-props": "error",

    "jsx-a11y/aria-proptypes": "error",

    "jsx-a11y/aria-role": ["error", { ignoreNonDOM: false }],

    "jsx-a11y/aria-unsupported-elements": "error",

    "jsx-a11y/autocomplete-valid": ["off", { inputComponents: [] }],

    "jsx-a11y/click-events-have-key-events": "error",

    "jsx-a11y/control-has-associated-label": [
      "error",
      {
        controlComponents: [],
        depth: 5,
        ignoreElements: [
          "audio",
          "canvas",
          "embed",
          "input",
          "textarea",
          "tr",
          "video",
        ],
        ignoreRoles: [
          "grid",
          "listbox",
          "menu",
          "menubar",
          "radiogroup",
          "row",
          "tablist",
          "toolbar",
          "tree",
          "treegrid",
        ],
        labelAttributes: ["label"],
      },
    ],

    "jsx-a11y/heading-has-content": ["error", { components: [] }],

    "jsx-a11y/html-has-lang": "error",

    "jsx-a11y/iframe-has-title": "error",

    "jsx-a11y/img-redundant-alt": "error",

    "jsx-a11y/interactive-supports-focus": [
      "error",
      {
        tabbable: [
          "button",
          "checkbox",
          "link",
          "searchbox",
          "spinbutton",
          "switch",
          "textbox",
        ],
      },
    ],

    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        assert: "either",
        controlComponents: [],
        depth: 25,
        labelAttributes: [],
        labelComponents: [],
      },
    ],

    "jsx-a11y/lang": "error",

    "jsx-a11y/media-has-caption": [
      "error",
      {
        audio: [],
        track: [],
        video: [],
      },
    ],

    "jsx-a11y/mouse-events-have-key-events": [
      "error",
      {
        hoverInHandlers: [
          "onMouseOver",
          "onMouseEnter",
          "onPointerOver",
          "onPointerEnter",
        ],
        hoverOutHandlers: [
          "onMouseOut",
          "onMouseLeave",
          "onPointerOut",
          "onPointerLeave",
        ],
      },
    ],

    "jsx-a11y/no-access-key": "error",

    "jsx-a11y/no-aria-hidden-on-focusable": "error",

    "jsx-a11y/no-autofocus": ["error", { ignoreNonDOM: false }],

    "jsx-a11y/no-distracting-elements": [
      "error",
      { elements: ["marquee", "blink"] },
    ],

    "jsx-a11y/no-interactive-element-to-noninteractive-role": [
      "error",
      { tr: ["none", "presentation"] },
    ],

    "jsx-a11y/no-noninteractive-element-interactions": [
      "error",
      {
        handlers: [
          "onClick",
          "onMouseDown",
          "onMouseUp",
          "onKeyPress",
          "onKeyDown",
          "onKeyUp",
        ],
      },
    ],

    "jsx-a11y/no-noninteractive-element-to-interactive-role": [
      "error",
      {
        li: ["menuitem", "option", "row", "tab", "treeitem"],
        ol: [
          "listbox",
          "menu",
          "menubar",
          "radiogroup",
          "tablist",
          "tree",
          "treegrid",
        ],
        table: ["grid"],
        td: ["gridcell"],
        ul: [
          "listbox",
          "menu",
          "menubar",
          "radiogroup",
          "tablist",
          "tree",
          "treegrid",
        ],
      },
    ],

    "jsx-a11y/no-noninteractive-tabindex": [
      "error",
      {
        allowExpressionValues: true,
        roles: ["tabpanel"],
        tags: [],
      },
    ],

    "jsx-a11y/no-onchange": "off",

    "jsx-a11y/no-redundant-roles": [
      "error",
      {
        nav: ["navigation"],
      },
    ],

    "jsx-a11y/no-static-element-interactions": [
      "error",
      {
        allowExpressionValues: true,
        handlers: [
          "onClick",
          "onMouseDown",
          "onMouseUp",
          "onKeyPress",
          "onKeyDown",
          "onKeyUp",
        ],
      },
    ],

    "jsx-a11y/prefer-tag-over-role": "error",

    "jsx-a11y/role-has-required-aria-props": "error",

    "jsx-a11y/role-supports-aria-props": "error",

    "jsx-a11y/scope": "error",

    "jsx-a11y/tabindex-no-positive": "error",

    "react/button-has-type": [
      "error",
      {
        button: true,
        reset: false, // MDN: This behavior tends to annoy users
        submit: true,
      },
    ],

    "react/iframe-missing-sandbox": "error",

    "react/jsx-boolean-value": [
      "error",
      "never",
      { assumeUndefinedIsFalse: false },
    ],

    "react/jsx-child-element-spacing": "warn",

    // Formatting
    "react/jsx-closing-bracket-location": "off",

    // Formatting
    "react/jsx-closing-tag-location": "off",

    "react/jsx-curly-brace-presence": [
      "error",
      // Maybe one day we can use propElementValues: "never"...
      { children: "never", propElementValues: "ignore", props: "never" },
    ],

    // Formatting
    "react/jsx-curly-newline": "off",

    // Formatting
    "react/jsx-curly-spacing": "off",

    // Formatting
    "react/jsx-equals-spacing": "off",

    // .js, .jsx, .tsx are all acceptable
    "react/jsx-filename-extension": "off",

    // Formatting
    "react/jsx-first-prop-new-line": "off",

    // Too stylistic
    "react/jsx-handler-names": "off",

    // Formatting
    "react/jsx-indent": "off",

    // Formatting
    "react/jsx-indent-props": "off",

    // Too stylistic
    "react/jsx-max-depth": "off",

    // Formatting
    "react/jsx-max-props-per-line": "off",

    // Formatting
    "react/jsx-newline": "off",

    "react/jsx-no-comment-textnodes": "error",

    "react/jsx-no-duplicate-props": ["error", { ignoreCase: false }],

    // We'll use strict-boolean-expressions instead
    "react/jsx-no-leaked-render": "off",

    "react/jsx-no-literals": "off",

    "react/jsx-no-script-url": "error",

    "react/jsx-no-target-blank": [
      "error",
      {
        allowReferrer: false,
        enforceDynamicLinks: "always",
        forms: true,
        links: true,
        warnOnSpreadAttributes: true,
      },
    ],

    // Also checked by TypeScript
    "react/jsx-no-undef": ["error", { allowGlobals: true }],

    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],

    // Formatting
    "react/jsx-one-expression-per-line": "off",

    "react/jsx-pascal-case": [
      "error",
      {
        allowAllCaps: true,
        allowLeadingUnderscore: false,
        allowNamespace: true,
      },
    ],

    // Formatting
    "react/jsx-props-no-multi-spaces": "off",

    // We like spreading
    "react/jsx-props-no-spreading": "off",

    "react/jsx-props-no-spread-multi": "error",

    "react/jsx-sort-props": 0,

    // Formatting
    "react/jsx-tag-spacing": "off",

    "react/jsx-uses-vars": "warn",

    // Formatting
    "react/jsx-wrap-multilines": "off",

    // Too stylistic
    "react/no-adjacent-inline-elements": "off",

    "react/no-children-prop": ["error", { allowFunctions: false }],

    "react/no-invalid-html-attribute": "error",

    // The original text allows for things like spellchecking and searching
    "react/no-unescaped-entities": "off",

    "react/no-unknown-property": [
      "error",
      {
        requireDataLowercase: true,
      },
    ],

    "react/self-closing-comp": ["error", { component: true, html: true }],

    "react/void-dom-elements-no-children": "error",
  },
});
