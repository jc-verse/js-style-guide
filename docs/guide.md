---
slug: /
sidebar_position: 1
---

# Guide

import Tabs from "@theme/Tabs"; import TabItem from "@theme/TabItem";

This page gets you started with JC-verse's JS style guide. The JS style guide is enforced through a set of toolings:

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [TypeScript](https://www.typescriptlang.org/)

We have created a sharable config for each tool.

## How to use

To get everything configured, you need the following files:

<Tabs>
<TabItem value=".eslintrc">

```json title=".eslintrc"
{
  "root": true,
  "extends": ["jc"]
}
```

</TabItem>
<TabItem value=".prettierrc">

```json title=".prettierrc"
"prettier-config-jc"
```

</TabItem>
<TabItem value=".husky/pre-commit">

```bash title=".husky/pre-commit"
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

bun lint-staged --allow-empty
```

</TabItem>
<TabItem value=".lintstagedrc.json">

```json title=".lintstagedrc.json"
{
  "*.{js,ts,jsx,tsx}": ["eslint --fix"],
  "*": [
    "prettier --ignore-unknown --write",
    "cspell --no-must-find-files --no-progress"
  ]
}
```

</TabItem>
<TabItem value="package.json">

```json
{
  "scripts": {
    "format": "prettier -w .",
    "lint": "eslint \"**/*.{js,ts,jsx,tsx}\"",
    "prepare": "husky install"
  }
}
```

</TabItem>
<TabItem value="tsconfig.json">

```json title="tsconfig.json"
{
  "extends": "tsconfig-jc",
  "compilerOptions": {
    "target": "es2020",
    "lib": ["esnext", "dom"],
    "rootDir": "./src",
    "jsx": "react"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

</TabItem>
<TabItem value=".cspell.json">

```json title=".cspell.json"
{
  "version": "0.2",
  "gitignoreRoot": ".",
  "useGitignore": true,
  "dictionaries": ["typescript", "project-words"],
  "dictionaryDefinitions": [
    {
      "name": "project-words",
      "path": "./project-words.txt",
      "noSuggest": true
    }
  ],
  "ignorePaths": ["package.json", "bun.lock", "project-words.txt"]
}
```

</TabItem>
</Tabs>

Then, you need to install some dependencies:

```bash
bun add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser cspell eslint eslint-config-jc eslint-plugin-header eslint-plugin-import-x eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks husky lint-staged prettier prettier-config-jc tsconfig-jc typescript
```

That's a lot of things to do. Fear not—we have a scaffolding utility to set everything up. Run:

```bash
bun create jc-project
```

And you should be finished.

## Overarching principles

Our style may sometimes contradict with other styles you have seen. Our decisions are based on the following principles:

### Minimal code area

We want our code to span as little area as possible, given the same set of formatting rules. This means:

- Fewer levels of indentation
- Fewer useless lines
- More usage of new and concise syntax

As a simple example, instead of this:

```ts
const parseResult = {
  fileName,
  path,
  extension,
};
```

Prefer this:

```ts
const parseResult = { fileName, path, extension };
```

A rule that marginally improves readability but bloats the code area will not be considered.

### Code for averagely intelligent people

Our code is written for people of average intelligence and with reasonable experience of JavaScript/TypeScript. Therefore, we will:

- Not be afraid of using new syntax (especially if it helps with **minimal code area**)
- Not be afraid of preferring concise expressions and control flow instead of writing spaghetti code

We will not enable most rules that forbid syntaxes claimed to be "confusing for some people". Quite the contrary—we encourage you to consciously think about how advanced usage of syntaxes can help reduce code area.

### Clear developer intent

During refactor, a big hazard is being unclear about whether a specific construct is guarding against a potential edge-case, or simply being over-pessimistic. Do NOT program overly defensively—only when such edge-cases are actually reachable. For example, if there can only ever be three values passed to a `switch...case`, do not add a default case. If TS tells you that a variable is possibly `undefined`, but it's simply due to a flaw in the control flow analysis, then use a simple non-null assertion instead of adding a redundant `if` guard.

## Final words

BTW, Nina wants me to mention that I think she's the cutest girl :)
