---
sidebar_position: 1
---

# General formatting

Code formatting is completely **Prettier-powered**. Some Prettier configuration options that can be contended are explained below. We only use ESLint to enforce some formatting rules that Prettier cannot handle, mostly around curly braces and comments.

## Dimensions

The `printWidth` is the default `80`. `100` seems a bit too dense, especially when we are pursuing **minimal code area** that can result in very few blank lines and lone-character lines. 80 characters is also the line length used in the GitHub diff viewer and helps make the diff clean.

`useTabs` is turned off. While there have been many valid arguments in favor of tabs (a powerful one is accessibility—some need larger tab spacing while others need smaller ones because their fonts are so big), using variable tab widths inevitably means broken formatting in some cases where the alignment is adjusted based on a fixed tab width. The `tabWidth` is the default `2`. Due to the deeply nested nature of common constructs like JSX and callbacks, 4-space indentation will soon bloat up the file.

## Quotes

`singleQuote` is the default `false`—we use double quotes. Some reasons are listed below:

- JSX props are commonly double-quoted, and it's good to keep consistency in other cases.
- Strings in many languages are double-quoted, with single quotes representing characters. Since JC-verse is multi-lingual, keeping a consistent formatting is worthwhile.
- Single quotes (for contractions: `"I'm Josh"`) within a string is much more common than double quotes, so using double quotes reduces the need to escape or manually convert quotes to avoid parsing failures.

`quoteProps` is the default `as-needed`. We don't want to add extra quotes, because non-quoted props are more beautifully highlighted in editors, and provide more visual contrast compared to the property values.

`jsxSingleQuote` is the default `false`. HTML is almost uniformly using double quotes, and we follow that convention in JSX.

## Other punctuation

We mandate semicolons with the default `semi: true`. Some reasons are listed below:

- Some people argue that ASI rules are very easy to remember and practice. That is true. However, it adds unnecessary mental burden to actually practice things like "insert leading semis" just to please ASI.
- Inserting leading semis is incredibly ugly.
- Hitting a semicolon asserts the end of a statement and provides a sense of completion.
- Semis are required in many languages and usually optional in others. We value cross-language consistency.

We require trailing commas in all cases through `trailingComma: "all"`, which is different from the default `"es5"`. We use transpilers to ensure compatibility, but we value the minimal diff and ease to rearrange members that trailing commas provide.

```diff
const candidates = [
+ "ESLint",
  "React",
  "Prettier",
  "TypeScript",
- "ESLint",
];
```

Object literals are separated by spaces with the default `bracketSpacing: true`. This improves readability, since otherwise, object literals can be easily confused with blocks, and the number of members will make the boundaries hard to notice.

JSX opening tags' closing brackets are kept at the end of the last line with `bracketSameLine: true`, which is different from the default. This is because of **minimal code area** and we believe the readability is not detracted, while a lone `>` is often weird-looking.

Arrow functions' parentheses are always required with the default `arrowParens: "always"`. This means minimal effort to add a parameter, and also to annotate the return type of the function.

## Curly braces

### [`curly`](https://eslint.org/docs/rules/curly)

- Severity: warning
- Configuration:
  - Require omitting braces only when the body is a single-line statement (`"multi-or-nest"`)
  - Require `if` and `else` to have consistent curly braces (`"consistent"`)

We want to omit curly braces for single-line statements, because they are more concise.

```ts
if (foo) bar();
if (!a) return null;
if (doX()) {
  const b = doX();
  if (b !== "Nonexistent") return `Result: ${b}`;
  return null;
}
```

However, omitting curly braces when the body is multi-line could quickly make the code lose focus, as is this example:

```ts
if (!foo) foo = { bar: "some a lot of text", qux: "some another lots of text" }; // Where does the block end? Where does the assignment end?
```

## Comments

### [`capitalized-comments`](https://eslint.org/docs/rules/capitalized-comments)

- Severity: warning
- Configuration:
  - Always require capitalization (`"always"`)
  - Allow multi-line comments (`ignoreConsecutiveComments: true`)
  - Do not ignore inline comments (`ignoreInlineComments: false`)
  - Ignore common ignore directives (`ignorePattern: "prettier-ignore|cSpell:ignore"`)

Comments should be written in a prose-like format, with proper grammar and capitalization. Even for sentence fragments, capitalize the first word.

```ts
// This should be a line of comment explaining why we need to apply the
// transformation `doX` on `b`.
const a = doX(b); // Even here—capitalize the first word
```

### [`max-len`](https://eslint.org/docs/rules/max-len)

- Severity: warning
- Configuration:
  - Only consider comments (`code: Infinity, comments: 80`)
  - Ignore disable directives, JSDoc, and URLs (`ignorePattern: "(eslint-disable|@)", ignoreUrls: true`)

This makes the comments more consistent with the rest of the code, and also ensures that writing very long comments can still be formatted nicely. Note that this usually requires manual fixing as most formatters don't wrap comments.

If a comment line only crosses the 80-character limit by one word, consider rephrasing the comment to make it below 80 characters, or wrap two words to the next line.

```ts
// Theoretically, we can only wrap 1 word for this line, but we wrap 2
// for aesthetics.
```

### [`multiline-comment-style`](https://eslint.org/docs/rules/multiline-comment-style)

- Severity: error
- Configuration:
  - Require each line to begin with `//` (`"separate-lines"`)

We use single-line comments, because otherwise, if we wrap comments at 80 characters, adding a few words may result in changing the entire comment's style, which is unfavorable. In addition, commenting out a chunk of text only requires <kbd>⌘</kbd> + <kbd>/</kbd>.

An exception to this rule is JSDoc comments.

```ts
// Some long comment explaining what this line is doing. The longer, the better—
// we want you to use eloquent language and proper grammar.

/**
 * JSDoc which shows up in editors.
 *
 * @param foo - The foo
 */
```

### [`no-inline-comments`](https://eslint.org/docs/rules/no-inline-comments)

- Severity: off

You should avoid using `/* ... */` style comments anywhere. However this rule also reports the following pattern:

```ts
const a = 1; // The purpose of a
```

which is actually encouraged. Therefore, you need to execute your own discretion.

### [`no-warning-comments`](https://eslint.org/docs/rules/no-warning-comments)

- Severity: off

You are free to commit `FIXME` and `TODO` comments so they get fixed in an indefinite time in the future. If you want a way to track them, use an editor extension like TODO tree.

### [`spaced-comment`](https://eslint.org/docs/rules/spaced-comment)

- Severity: error
- Configuration:
  - Require a space after `//` (`"always"`)
  - Require spaces padding for `/* */` (`block.balanced: true`)
  - Allow no comment-pattern exceptions (`exceptions: []`)
  - Allow the following to appear at the beginning of line comments without space: `"=", "!", "/"`
  - Allow the following to appear at the beginning of block comments without space: `"=", "!", ":", "::"`

You should always have a space after `//` and `/*`. This makes the text easier to read. The exceptions here are to support common patterns, such as `///` for TS triple-slash directives, and `/*::` for Flow type annotations.

## Whitespace

### [`no-irregular-whitespace`](https://eslint.org/docs/rules/no-irregular-whitespace)

- Severity: error
- Configuration:
  - Allow irregular whitespace nowhere (`skipComments: false, skipJSXText: false, skipRegExps: false, skipStrings: false, skipTemplates: false`)

Irregular whitespace is a common source of bugs. It's easy to accidentally copy a non-breaking space from a website, or to accidentally type a non-breaking space. In addition, code might subtly break if someone else tries to naïvely retype the code themselves instead of copy-pasting it.

### [`no-unexpected-multiline`](https://eslint.org/docs/rules/no-unexpected-multiline)

- Severity: error

You may accidentally forget a semicolon and end up with code like:

<!-- prettier-ignore -->
```ts
const hello = "world"
[1, 2, 3].forEach(addNumber);
```

This rule prevents code that does not look idiomatic. Prettier may help by making the code more obvious:

```ts
const hello = "world"[(1, 2, 3)].forEach(addNumber);
```

But we believe more immediate feedback is better.
