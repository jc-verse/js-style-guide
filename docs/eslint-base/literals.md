---
sidebar_position: 2
---

# Literals

This page discusses styles for number, string, and regex literals, as well as template/symbol expressions.

## Number literals

### [`no-loss-of-precision`](https://eslint.org/docs/rules/no-loss-of-precision)

- Severity: error

Do not use numbers literals that don't represent what they look like. For example, `5123000000000000000000000000001` does not represent that number. Note that this rule works automatically with literal types.

### [`no-magic-numbers`](https://eslint.org/docs/rules/no-magic-numbers)

- Severity: off

You are free to use numbers as you see fit.

```ts
for (let i = 0; i < groups.length; i += 2) {
  const x = groups[i];
  const y = groups[i + 1];
}
```

Use comments if the numbers are not self-explanatory.

### [`no-octal`](https://eslint.org/docs/rules/no-octal)

- Severity: error
- Related:
  - `ts(1489): Decimals with leading zeros are not allowed.`

Do not use legacy octal literals (`011`). They are deprecated and are syntax errors in strict mode. Use `0o` instead.

### [`prefer-numeric-literals`](https://eslint.org/docs/rules/prefer-numeric-literals)

- Severity: error

Use `0b` and `0o` number literals instead of `parseInt` with a static string.

### [`radix`](https://eslint.org/docs/rules/radix)

- Severity: error

You should always use `parseInt` with a radix. This prevents accidental behavior inconsistencies when the string starts with `0` or `0x`. If you intentionally want to accommodate many number formats, use the `Number` constructor instead.

## String literals

### [`no-multi-str`](https://eslint.org/docs/rules/no-multi-str)

- Severity: error

Do not use `\` to split strings across multiple lines—it doesn't work well with indentation. Write string literals that are as long as you want.

### [`no-nonoctal-decimal-escape`](https://eslint.org/docs/rules/no-nonoctal-decimal-escape)

- Severity: error

Do not use `\8` and `\9` in string literals because they are useless and confusing. Just write `8` and `9` instead.

### [`no-octal-escape`](https://eslint.org/docs/rules/no-octal-escape)

- Severity: error
- Related:
  - `ts(1487): Octal escape sequences are not allowed. Use the syntax '\x3f'.`

Do not use octal escapes in string literals. They are deprecated and are syntax errors in strict mode. Use `\x` or `\u` instead.

### [`no-script-url`](https://eslint.org/docs/rules/no-script-url)

- Severity: error

Do not use `javascript:` URLs. They are a form of `eval`.

### [`no-template-curly-in-string`](https://eslint.org/docs/rules/no-template-curly-in-string)

- Severity: warning

Usually, using the `${}` syntax in a string literal is a mistake. However, it's not a deadly error, so we only set it to warning.

### [`no-useless-concat`](https://eslint.org/docs/rules/no-useless-concat)

- Severity: error

Do not use string concatenation when you can just use a single string literal. You should generally not use string concatenation to make a "multi-line string" either—just make the string literal as long as you want.

### [`no-useless-escape`](https://eslint.org/docs/rules/no-useless-escape)

- Severity: error

Do not use `\` to escape characters that do not need escaping. It's confusing and unnecessary. In regexes, these identity escapes cause syntax errors in Unicode mode (which is required).

### [`prefer-template`](https://eslint.org/docs/rules/prefer-template)

- Severity: error

Use template literals instead of string concatenation. It's more readable and less error-prone. Use it _everywhere_ — never use `+` for string concatenation. This includes `str1 + str2`, which should be written as `` `${str1}${str2}` ``.

## Regular expressions

### Prefer concise syntax

There are many ways to represent the same regular expression. Instead of this:

```ts
const rule = { test: /\.(?:js|ts|jsx|tsx)/i };
```

Prefer this:

```ts
const rule = { test: /\.[jt]sx?/i };
```

Regular expressions are _not_ intended to be readable; they are designed for machine consumption. Convey the intent of a regular expression through test cases, not through making it verbose. Related to **code for the average-intelligent**.

### [`no-control-regex`](https://eslint.org/docs/rules/no-control-regex)

- Severity: warning
- Related:
  - `regexp/no-control-character`

Control characters are rarely used in regular expressions because they are rarely present in string literals at all. It's only set to warning so you should not fear disabling the rule where needed.

### [`no-div-regex`](https://eslint.org/docs/rules/no-div-regex)

- Severity: off

This is an extremely weird rule that forbids `=` at the immediate beginning of a regex. We believe that the chance of one confusing `/=` with `/=/` is sparse, and most places have good syntax highlighting to distinguish them.

### [`no-empty-character-class`](https://eslint.org/docs/rules/no-empty-character-class)

- Severity: error
- Related:
  - `regexp/no-empty-character-class`

Empty character classes cause the regex to never match.

### [`no-invalid-regexp`](https://eslint.org/docs/rules/no-invalid-regexp)

- Severity: error
- Related:
  - `regexp/no-invalid-regexp`

Write valid regular expressions. The only case where you might want to add a disable comment is when you are using novel syntax not supported by ESLint.

### [`no-misleading-character-class`](https://eslint.org/docs/rules/no-misleading-character-class)

- Severity: error
- Configuration:
  - Allow character classes to use surrogate pairs if they are escaped (`allowEscape: true`)
- Related:
  - `regexp/no-misleading-unicode-character`

Do not write character classes that contain grapheme clusters or astral characters in general. Common ways to fix this are:

- Change character class to a disjunction
- Use the `u` flag, if you want to use astral characters
- Use `\q{}` and the `v` flag, if you want to use grapheme clusters

### [`no-regex-spaces`](https://eslint.org/docs/rules/no-regex-spaces)

- Severity: off
- Related:
  - `regexp/prefer-quantifier`

Although we want to use concise syntax, multiple spaces in a regex is often useful to resemble constructs that readers are familiar with.

```ts
// Matches a well-formatted table row
const match = tableRow.match(/\| Column      \| Another one \|/);
```

### [`no-useless-backreference`](https://eslint.org/docs/rules/no-useless-backreference)

- Severity: error
- Related:
  - `regexp/no-useless-backreference`

Do not write backreferences that always resolve to the empty string.

### [`prefer-named-capture-group`](https://eslint.org/docs/rules/prefer-named-capture-group)

- Severity: warning
- Related:
  - `regexp/prefer-named-capture-group`

Named capture groups allow us to semantically identify each group. It also warns about those groups that should probably be explicitly marked as non-capturing groups.

```ts
const rule = {
  // Is this capturing group actually useful? If I remove it, would it break
  // consumer code?
  test: /\.(jpe?g|png|webp)/i,
};
```

Ultimately, this makes refactor less risky because addition of a capturing group does not shift the other indices.

```diff
- const commitPattern = /(.+),(.+)/;
+ const commitPattern = /(.+),(.+),(\d+)/;

const date = commit.match(commitPattern)?.[1];
// Oops, I need to also change `[1]` to `[2]`...
```

:::note

Named capture groups isn't strongly typed in TypeScript. See [microsoft/TypeScript#32098](https://github.com/microsoft/TypeScript/issues/32098). If you access `match.groups.someName`, you will get `| undefined` under `noUncheckedIndexAccess`, even when `someName` always exists. In this case, prefer using a non-null assertion to convey developer intent.

:::

### [`prefer-regex-literals`](https://eslint.org/docs/rules/prefer-regex-literals)

- Severity: error
- Configuration:
  - Do not allow using `RegExp` on a regex literal (`disallowRedundantWrapping: true`)

Only use the `RegExp` constructor when either the source or the flags is dynamic. Otherwise, use a regex literal. This applies to regex literals with a lot of escaping, too.

```ts
// Don't write:
new RegExp("https://jc-verse.github.io/js-style-guide/eslint-base/literals");

// Write:
/https:\/\/jc-verse\.github\.io\/js-style-guide\/eslint-base\/literals/;
```

### [`require-unicode-regexp`](https://eslint.org/docs/rules/require-unicode-regexp)

- Severity: error
- Related:
  - `regexp/require-unicode-regexp`

Always use the `u` or `v` flag. This does not just enable additional features; it also disables legacy features, like strict mode for regexes. See [deprecated regex features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Deprecated_and_obsolete_features#regexp).

## Symbols

### [`symbol-description`](https://eslint.org/docs/rules/symbol-description)

- Severity: error

Always provide a description for symbols. This is useful for debugging.
