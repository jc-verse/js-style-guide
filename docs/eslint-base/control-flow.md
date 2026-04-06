---
sidebar_position: 5
---

# Control flow

This page introduces styles for all statements, such as `if-else`, loops, conditions, and general authoring of control flow.

## Blocks

### [`no-empty`](https://eslint.org/docs/rules/no-empty)

- Severity: error
- Configuration:
  - Allow empty catch blocks (`allowEmptyCatch: true`)

Empty blocks are useless and are a sign of refactoring artifacts. The only exception is empty `catch` blocks, which are used to ignore errors. However this should be rare too, and you should generally add a comment explaining why the error is ignored. This rule doesn't prevent an empty statement from being used, so you can still do this:

```ts
for (let a = 0; a < 10; a++);
```

Although TypeScript doesn't allow the following when you want an `unless` construct:

```ts twoslash
// @errors: 1313
if (Math.random() > 0.5);
else {
  // do something when the condition is false
}
```

### [`no-lone-blocks`](https://eslint.org/docs/rules/no-lone-blocks)

- Severity: error

This rule only reports where the block is absolutely unnecessary (when it does not contain lexical declarations). Removing the block will be able to reduce indentation and lines.

## Conditionals

### [`no-constant-condition`](https://eslint.org/docs/rules/no-constant-condition)

- Severity: error
- Configuration:
  - Disallow constant conditions in all loops, including `while (true)` (`checkLoops: "all"`)

Constant conditions that always evaluate to truthy or falsy can be refactoring artifacts. In addition, infinite loops are also forbidden to prompt developers to consider alternatives like explicit exit conditions instead of `break` statements, or `setInterval`.

```ts
// Instead of this:
while (true) {
  curNode = findNextNode(curNode);
  if (isTargetNode(curNode)) break;
}

// Do this:
do {
  curNode = findNextNode(curNode);
} while (!isTargetNode(curNode));
```

In the very rare case where you do need an infinite loop (such as when the program is a message loop), use a disable comment. Note that `for (;;)` is also a viable workaround where really intended.

### [`no-negated-condition`](https://eslint.org/docs/rules/no-negated-condition)

- Severity: off

You should generally avoid using negative conditions when the two cases have equal weight:

```ts
if (!isFoo) {
  // 10 lines
} else {
  // 10 lines
}
```

However, in the case where one case is either much more common or much shorter, put the shorter case first, so it can get out of readers' minds early:

```ts
if (!isReady) {
  // 5 lines
} else {
  // 50 lines
}
```

But in this case, consider whether you can use early return, so you can omit the `else` block altogether.

## `if-else`

### [`no-dupe-else-if`](https://eslint.org/docs/rules/no-dupe-else-if)

- Severity: error

It is probably a mistake, or at least extremely confusing, to have the same condition written twice. If each condition leads to a side effect, consider restructuring your code.

```ts
let a = 1;
if (a++ === 3) {
  // a was originally 3
} else if (a++ === 3) {
  // a was originally 2
} else if (a++ === 3) {
  // a was originally 1
} else {
  // ...
}
```

```ts
let a = 1;
let hasFound = false;
while (a++ <= 3 && !hasFound) {
  if (a === 3) hasFound = true;
}
```

### [`no-else-return`](https://eslint.org/docs/rules/no-else-return)

- Severity: error
- Configuration:
  - Allow `else if` after the previous block ends with `return` (`allowElseIf: true`)

Using `return` at the top level instead of within `else` allows you to write with less indentation. It also prevents accidental unreachable code. `else if` is allowed because it leads to fewer lines compared to two separate `if` statements, and also makes the flow clearer.

### [`no-lonely-if`](https://eslint.org/docs/rules/no-lonely-if)

- Severity: error

Do not use an `if` statement as the only statement in an `else` block. Use `else if` instead.

```ts
if (something) {
  // ...
} else {
  if (somethingElse) {
    // ...
  }
}
```

## Loops

### [`for-direction`](https://eslint.org/docs/rules/for-direction)

- Severity: error

The for loop should always be iterating in the correct direction, which means increment + check for upper bound, or decrement + check for lower bound.

```ts
for (let i = 10; i >= 0; i++) console.log(i); // -> 10 11 12 13 ...
```

### [`guard-for-in`](https://eslint.org/docs/rules/guard-for-in)

- Severity: off

We ban `for...in` loops altogether via `no-restricted-syntax`. In the rare case where you actually use `for...in`, we assume you know what you are doing and you actually intend to visit the prototype chain.

### [`no-continue`](https://eslint.org/docs/rules/no-continue)

- Severity: off

`continue` is a way of early-bailing to avoid creating extra indentation. Instead of this:

```ts
for (const line of lines) {
  if (line.trim().length > 0) {
    // 20 lines of handling this line...
  }
}
```

Prefer this:

```ts
for (const line of lines) {
  if (line.trim().length === 0) continue;
  // 20 lines of handling this line...
}
```

### [`no-unmodified-loop-condition`](https://eslint.org/docs/rules/no-unmodified-loop-condition)

- Severity: error

Unmodified loop conditions are usually a mistake. Note that this rule may have false-positives but the chances are low.

### [`no-unreachable-loop`](https://eslint.org/docs/rules/no-unreachable-loop)

- Severity: error
- Configuration:
  - Allow no exceptions (`ignore: []`)

Do not write loops that only run once. Either use an `if` statement instead or put the `break` inside a conditional.

### Use of `for-in`

We ban `for...in` loops altogether via `no-restricted-syntax`. This is because it traverses the prototype chain, which is almost never what you want. Usually, you should refactor `for (const key in obj)` to `for (const key of Object.keys(obj))`, or consider if you meant `for-of` in the first place.

## `switch-case`

### [`default-case`](https://eslint.org/docs/rules/default-case)

- Severity: off

We do not require a default case, because it is very idiomatic to use `switch-case` when we do know that the value falls within a finite range.

```ts twoslash
type TreeNode =
  | { type: "leaf"; value: number }
  | { type: "parent"; children: TreeNode[] };

function transformNode(node: TreeNode) {
  switch (node.type) {
    case "leaf":
      node.value++;
      break;
    case "parent":
      node.children.forEach(transformNode);
      break;
    default:
      // This will never happen given proper boundary typing and input
      // validation, but results in useless non-test-covered lines. Just omit
      // the default case.
      // @ts-expect-error: should never happen
      throw new Error(`Bad node type ${node.type}`);
  }
}
```

More favorably, _only_ use switch-case if the matched value has a finite range (e.g. a union of literals). If it can be any value, use if-else instead.

```ts twoslash
type Res =
  | { code: 200; body: string; error: never }
  | { code: number; error: string; body: never };

function handleResponse(res: Res) {
  if (res.code === 404) {
    return "Not found";
  } else if (res.code === 500) {
    return "Server error";
  } else if (res.code === 200) {
    return res.body;
  } else {
    return `Unknown response shape: ${JSON.stringify(res)}`;
  }
}
```

You may ask, what if the type doesn't reflect the full range of possible runtime input? The answer is, you are missing input validation. Writing incomplete types is going to cause troubles elsewhere, if not here.

### [`default-case-last`](https://eslint.org/docs/rules/default-case-last)

- Severity: error

In case where there's indeed a default case, we require it to be placed last. This is because a default case means, well, that all _previous_ matches have failed. When reading the code, the reader is more interested in what the _previous_ specified cases are rather than what the fallback behavior is.

### [`no-case-declarations`](https://eslint.org/docs/rules/no-case-declarations)

- Severity: error

If a case contains lexical declarations, it must be wrapped in a block. This is because the `case` are more like labels and do not create their own scope. This may lead to unexpected bugs, especially if there's fallthrough.

TODO: examples?

### [`no-duplicate-case`](https://eslint.org/docs/rules/no-duplicate-case)

- Severity: error

See [`no-dupe-else-if`](#no-dupe-else-if).

### [`no-fallthrough`](https://eslint.org/docs/rules/no-fallthrough)

- Severity: error
- Configuration:
  - Allow empty cases to fall through (`allowEmptyCase: true`)
  - Do not allow comments (`commentPattern: undefined`)

It is a common error to forget `break`. In cases where you do want to fall through, use a disable comment, which is just as expressive as a custom comment like `// fallthrough`.

```ts
switch (a) {
  case 1:
    console.log();
  // eslint-disable-next-line no-fallthrough
  case 2:
}
```

## `try-catch`

### [`no-ex-assign`](https://eslint.org/docs/rules/no-ex-assign)

- Severity: error

There aren't many good reasons for re-assigning `err` in a `catch` block. In TypeScript, its type is always `unknown`, so even if you normalize its type in value-land, you still have to cast it to a more specific type to use it.

```ts twoslash
try {
  // ...
} catch (err) {
  err = new Error(String(err)); // err is still unknown
  // ^?
}
```

Just create a new variable instead.

### [`no-unsafe-finally`](https://eslint.org/docs/rules/no-unsafe-finally)

- Severity: error

Do not use control-flow statements (`return` or `throw` in particular) in a `finally` block. This overwrites the completion value of the `try` block.

Note that errors may still be thrown from the `finally` block but the possibility is low. When this happens, it usually means something very bad had happened and is not up to the developer to handle anyway.

```ts
try {
  // ...
} finally {
  closeFile(); // May still throw if the file fails to close
}
```

### [`no-useless-catch`](https://eslint.org/docs/rules/no-useless-catch)

- Severity: error

Do not use `try-catch` blocks that only re-throw the caught error. This is a sign of refactoring artifacts.

```ts
try {
  // ...
} catch (e) {
  // Maybe you intend to have some additional handling here?
  throw e;
}
```

### [`preserve-caught-error`](https://eslint.org/docs/rules/preserve-caught-error)

- Severity: error
- Configuration:
  - Allow ignoring original error (`requireCatchParameter: false`)

When re-throwing an error in the `catch` block, always attach the original error as the `cause` instead of just incorporating its message/stack.

```ts
try {
  doSomething();
} catch (err) {
  throw new Error("Error while doing something", { cause: err });
}
```

## Labels

### [`no-extra-label`](https://eslint.org/docs/rules/no-extra-label)

- Severity: error

Only use a label when it can break out of nested loops. Do not use labels if the `break`/`continue` functions correctly without them.

### [`no-label-var`](https://eslint.org/docs/rules/no-label-var)

- Severity: error

Do not give a label the same name as a variable. This is potentially confusing.

### [`no-labels`](https://eslint.org/docs/rules/no-labels)

- Severity: off

We allow labels. They are useful for breaking out of nested loops. However, we ban unnecessary labels with `no-extra-label` and unused labels with `no-unused-labels`, which should eliminate most of the problems with accidental labels.

### [`no-unused-labels`](https://eslint.org/docs/rules/no-unused-labels)

- Severity: error
- Related:
  - `ts(7028): Unused label.`

Do not declare labels that are not used. This is the same mistake as declaring unused variables, and is potentially worse because labels are very rare, and unused labels are usually signs of miswritten code, such as `() => { a: 1 }` where `a` is parsed as a label.

## Other statements

### [`no-debugger`](https://eslint.org/docs/rules/no-debugger)

- Severity: error

You should never have `debugger` statements in production code.

### [`no-throw-literal`](https://eslint.org/docs/rules/no-throw-literal)

- Severity: error

You should always throw one of the following:

1. Newly created `Error` instances
2. In the case of re-throwing: the caught error
3. In the case of an API returning an error wrapped in a result: the expression representing that error (usually `result.error`, etc.)

Throwing a string literal is never allowed because it doesn't contain the stack trace and other APIs expecting `Error` instances may not function correctly. There are some API designs that require using `throw` (like `throw redirect(301)`) but such cases are extremely rare.

### [`no-unreachable`](https://eslint.org/docs/rules/no-unreachable)

- Severity: error
- Related:
  - `ts(7027): Unreachable code detected.`

Unreachable code is always a mistake. Furthermore, TypeScript gives up on control-flow analysis inside unreachable code, so you may get type errors that are not real.

### [`no-unused-expressions`](https://eslint.org/docs/rules/no-unused-expressions)

- Severity: error
- Configuration:
  - Allow short-circuiting operators (`allowShortCircuit: true`)
  - Allow ternary expressions (`allowTernary: true`)
  - Allow tagged templates (`allowTaggedTemplates: true`)
  - Disallow unused JSX expressions (`enforceForJSX: true`)
  - Allow directives (`ignoreDirectives: true`), but just for the sake of completeness because the parser already strips them in ES5+.

Every expression statement must have some side-effect. We allow only the following expressions as statements:

- Assignments
- Calls (including `new`, tagged templates, and `import()`)
- Logical operators (`&&`, `||`, `??`, `? :`) to substitute for control-flow statements like `if...else`

### [`no-with`](https://eslint.org/docs/rules/no-with)

- Severity: error
- Related:
  - `ts(1101): 'with' statements are not allowed in strict mode.`

`with` is forbidden in strict mode. It is also forbidden in TypeScript and causes TypeScript to give up on any type checking.

## Complexity

We don't think there's a single good metric of code complexity. We optimize for readability instead, and sometimes workarounds to "high complexity" code actually reduces readability by fragments the code into chunks that are hard to trace. Therefore, most of the rules aiming to limit complexity are disabled.

### [`complexity`](https://eslint.org/docs/rules/complexity)

- Severity: off

### [`max-depth`](https://eslint.org/docs/rules/max-depth)

- Severity: off

### [`max-lines`](https://eslint.org/docs/rules/max-lines)

- Severity: off

### [`max-statements`](https://eslint.org/docs/rules/max-statements)

- Severity: off
