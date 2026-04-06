# eslint-config-jc

My personal coding style.

This is designed to be a replacement for `eslint:recommended`, `plugin:react-hooks/recommended`, `plugin:@typescript-eslint/recommended`, and of course, everyone's favorite `airbnb`. It also extends `prettier`.

## Installation

```sh
bun add -D eslint-config-jc
```

No need to install any other plugins. You should probably also have the following dependencies:

- `eslint`
- `typescript-eslint` (for authoring the config)

## Configuration

`eslint.config.mjs`:

```js
import jcRules from "eslint-config-jc";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...jcRules({
    // options
  }),
  {
    // Your overrides here
  },
);
```

The `jcRules` function has the following options:

- `react`: enable React and JSX rules (also loads browser globals)
- `typescriptTypeCheck`: enabled type-checked rules
- `node`: enable Node.js rules (also loads Node globals)
- `reactClassComp`: enable rules for class components (you probably don't need this)
- `reactPropTypes`: enable rules for prop types (you probably don't need this)

Each option can be set to `true` to enable, or an array of paths used for the `files` ESLint option.

## Configuration philosophy

When analyzing whether a rule should be `error`, `warn`, or `off`, the following assumptions are made:

- ESLint is run in CI
- The editor has proper syntax highlighting and also integrates ESLint
- There are pre-commit hooks that run `eslint --fix`

Therefore, the semantic differences between `warn` or `error` are:

- An error is calling to immediate coder attention, while a warning can be delayed to the future
- Warnings can be safely `eslint-disable`'d
- Errors block CI and are never allowed in the codebase

A rule will be an error only if one of the following is true:

- This is definitely a mistake (no sane code would look like this), _or_
- This rule is fixable (and therefore doesn't block CI anyways assuming a normal development process)

A rule will be a warning if:

- There can be foreseeable false-positives, _or_
- It's stylistic

A rule will be off if:

- It enforces a style that goes against our own style guide
- It forbids a practice that we find value in

A rule will _not_ be off solely because:

- TypeScript or other rules enforce the same practice
- It enforces a practice concerning a construct that we never use in the first place

Instead, in such case, we'd rather have multiple errors.

All rules are considered as `error` by default, unless there are enough justifications to turn it into a warning or turn it off, as outlined above.
