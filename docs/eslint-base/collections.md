---
sidebar_position: 8
---

# Collections

This page introduces rules related to arrays and other structures.

## Arrays

### [`array-callback-return`](https://eslint.org/docs/rules/array-callback-return)

- Severity: error
- Configuration:
  - Disallow `return;` to implicitly mean `return undefined;` (`allowImplicit: false`)
  - Do not enforce that `forEach` callback doesn't return a value (`checkForEach: true`)

The intention of this rule is clear: to make the usage of array methods more appropriate. `Array#forEach` is the only method that's designed to be purely for its side-effects, while all the other methods should not only return a value, but also strive to be side-effect-free. Note that TypeScript doesn't check the return type of callbacks, because the callbacks are very loosely typed.

However, we have to give up on checking `forEach`, due to false-positives with concise arrows. Consider this:

```ts
const arr = [1, 2, 3];
const set = new Set<number>();
// checkForEach will report this case as well
arr.forEach((x) => set.add(x));
```

Note that this rule can still false-positive when calling a method on a non-array object. However, we still set the severity as error because:

- The necessity of enforcing callback return values far outweighs the risk of false-positive.
- Most APIs that are called `map` or `filter` are sanely designed and function in a similar fashion as array methods.

### [`no-array-constructor`](https://eslint.org/docs/rules/no-array-constructor)

- Severity: error

We disallow the use of `Array()` because you should always prefer array literals. Even in the case of `Array<T>()`, you should generally use `[] as T[]` or `[] satisfies T[]` instead.

### [`no-sparse-arrays`](https://eslint.org/docs/rules/no-sparse-arrays)

- Severity: error

Don't create sparse arrays. They are very hard to optimize and behave inconsistently with different array methods. This rule only checks array literals, but you should: (a) generally not use `Array(length)` (b) don't `delete` array indices (c) don't manually extend the `length` property.
