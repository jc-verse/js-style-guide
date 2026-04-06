---
sidebar_position: 4
---

# Operators

This page discusses styles for all operators, including arithmetic, comparison, assignment, and other operators.

## Arithmetics

### [`no-bitwise`](https://eslint.org/docs/rules/no-bitwise)

- Severity: off

Bitwise operators are useful, efficient, and cool. We don't think disabling them are worthwhile.

```ts twoslash
enum Traits {
  USEFUL = 1 << 0,
  EFFICIENT = 1 << 1,
  OBSCURE = 1 << 2,
  COOL = 1 << 3,
}

const bitwise = Traits.USEFUL | Traits.EFFICIENT | Traits.COOL;
```

### [`prefer-exponentiation-operator`](https://eslint.org/docs/rules/prefer-exponentiation-operator)

- Severity: error

Use exponentiation instead of `Math.pow`. This works with BigInts too.

## Comparisons

### [`eqeqeq`](https://eslint.org/docs/rules/eqeqeq)

- Severity: error
- Configuration:
  - Always require `===` (`"always"`)
  - Require strict comparison with `null` (`null: "always"`)

Regular equality can result in surprising results (e.g. `1 == "1"`). Although this is partly mitigated by TypeScript's type-checking, it can still become a pitfall on module boundaries without strict input validations.

`null` is not exempted from this rule. We require you to explicitly check for `null` with `===` or `!==`, because without TypeScript, your code may not work against `document.all`. `a === null || a === undefined` is not exactly equivalent to `a == null`. If you find it too pedantic, consider toggling it to `null: "ignore"` yourself.

```ts twoslash
function foo(a?: string | null) {
  if (a === null || a === undefined) return "Nullish";
  return a; // Only strings are left here
}
```

### [`no-compare-neg-zero`](https://eslint.org/docs/rules/no-compare-neg-zero)

- Severity: error

Comparing against negative zero is either a typo (an extra `-`) or is intended to be `Object.is`. In either case, such usage should be reported.

### [`no-eq-null`](https://eslint.org/docs/rules/no-eq-null)

- Severity: error

This is a subset of `eqeqeq`. Again, you may turn this off if the project doesn't care about `document.all`.

### [`no-self-compare`](https://eslint.org/docs/rules/no-self-compare)

- Severity: error

See [`no-self-assign`](#no-self-assign). If you want to test for `NaN`, use `Number.isNaN`.

### [`use-isnan`](https://eslint.org/docs/rules/use-isnan)

- Severity: error
- Configuration:
  - Do not write `case NaN` (`enforceForSwitchCase: true`)
  - Do not write `.indexOf(NaN)` (`enforceForIndexOf: true`)

`NaN` never compares equal to anything, so `x === NaN` is likely a mistake. Other cases where `===` semantics is used, including `switch-case` and `indexOf`, should also not compare against `NaN`. Use `Number.isNaN` instead.

### [`yoda`](https://eslint.org/docs/rules/yoda)

- Severity: error
- Configuration:
  - Always require the literal to be on the right (`"never"`)
  - Allow `0 <= x && x <= 1` style (`exceptRange: true`)

Yoda conditions make code harder to read. With proper formatting and linting, there's no way `===` can be confused with `=`. The only allowed case is range comparisons, which simulates the `0 <= x <= 1` style.

## Objects

### [`dot-notation`](https://eslint.org/docs/rules/dot-notation)

- Severity: error
- Configuration:
  - Keywords are treated the same as ordinary properties (non-ES3 compatible) (`allowKeywords: true`)

From the ESLint docs:

> the dot notation is often preferred because it is easier to read, less verbose, and works better with aggressive JavaScript minimizers.

There's no exception to this rule. We turn off the `noPropertyAccessFromIndexSignature` TS option, and we don't use TS `private`/`protected` members, so there's no reason to use bracket notation.

### [`new-cap`](https://eslint.org/docs/rules/new-cap)

- Severity: error
- Configuration:
  - Do not require capitalized names to be called with `new` (`capIsNew: false`)
  - Require `new` to only be called on capitalized names (`newIsCap: true`)
  - Check properties too (`properties: true`)

This is purely a stylistic choice. Use capital iff you have a constructor. This is also checked by `naming-convention`. If you are using constructors generically, still use uppercase:

```ts
function clone(obj: object) {
  const Ctor = obj.constructor?.[Symbol.species] ?? obj.constructor ?? Object;
  return new Ctor();
}
```

### [`no-delete-var`](https://eslint.org/docs/rules/no-delete-var)

- Severity: error

The `delete` operator should only be used on object properties. Deleting anything else is either a no-op or a syntax error. Notably, `delete x` is (a) a syntax error in strict mode (b) a no-op in non-strict mode if you are trying to delete a `var` (since variables are always non-configurable). If you want to delete a configurable global property, use `delete globalThis.x`.

### [`no-new`](https://eslint.org/docs/rules/no-new)

- Severity: off

It's generally useful for detecting unused expressions, but in the case where we actually have unused `new` expressions, they are almost 100% intentional. The most representative case is using `new URL()` to test if a string is a valid URL (until in 2023 we had a `URL.canParse()` function).

### [`no-unsafe-optional-chaining`](https://eslint.org/docs/rules/no-unsafe-optional-chaining)

- Severity: error
- Configuration:
  - Disallow optional chaining as arithmetic operands (`disallowArithmeticOperators: true`)
- Related:
  - `ts(18048): 'a.foo' is possibly 'undefined'.`

Optional chaining should be able to return `undefined` by design. Using it in places where `undefined` is not allowed potentially leads to runtime errors. This is also checked by TypeScript. If the left-hand side can never be nullish, remove the optional chaining (also enforced by `@typescript-eslint/no-unnecessary-condition`).

### Use of `in`

We ban the use of `in` because of many reasons: (a) it's not type-safe (b) it tests for properties on the prototype which is prone to injection. If you want to narrow an unknown type, write a custom type guard (and optionally disable the rule for that line). If you want to use an object as a dictionary, use a `Map`.

## Boolean logic

### [`no-constant-binary-expression`](https://eslint.org/docs/rules/no-constant-binary-expression)

- Severity: error
- Related:
  - `@typescript-eslint/no-unnecessary-condition`

Despite not using type information, this rule does its best at reliably testing for useless code and warning against potential mistakes.

### [`no-extra-boolean-cast`](https://eslint.org/docs/rules/no-extra-boolean-cast)

- Severity: error
- Configuration:
  - Check logical expressions too (`enforceForInnerExpressions: true`)

Do not cast to booleans when values are already in a boolean context.

### [`no-nested-ternary`](https://eslint.org/docs/rules/no-nested-ternary)

- Severity: off

You can nest ternaries if you want. It does come with readability tradeoffs, but 2 or 3 levels are generally fine, especially if it's written in a "continuous" style: `a ? b : c ? d : e`. The benefit of using nested ternaries is to avoid side effects, because `if...else` statements are clunky and sometimes require mutating variables/properties.

### [`no-ternary`](https://eslint.org/docs/rules/no-ternary)

- Severity: off

Use ternaries. Use them to replace simple `if-else` so you can avoid unneeded re-assignments.

### [`no-unneeded-ternary`](https://eslint.org/docs/rules/no-unneeded-ternary)

- Severity: error
- Configuration:
  - Disallow all ternaries that can be simplified (`defaultAssignment: false`)

Don't use ternaries when you don't need to. Such cases include when the two branches are `true` and `false` (use `Boolean()` instead) and `x ? x : y` (use `??` or `||` instead).

### [`no-unsafe-negation`](https://eslint.org/docs/rules/no-unsafe-negation)

- Severity: error
- Configuration:
  - Disallow negations to be used in comparisons (`enforceForOrderingRelations: true`)

`!` has higher precedence than relational operators (`in`, `instanceof`, `<`, `>`, `<=`, `>=`), so `!a instanceof b` is always a bug because a boolean is never an instance of any constructor (unless in corner cases when `b` has a `@@hasInstance` method). Prettier will add parentheses to make it more obvious (`(!a) instanceof b`), but ESLint will help you catch it before formatting.

## Assignment

The general principle for using assignment operators is to treat them as statements, not expressions. You should generally not rely on their return values, including in conditions, chained assignments, and return statements.

### [`logical-assignment-operators`](https://eslint.org/docs/rules/logical-assignment-operators)

- Severity: error
- Configuration:
  - Require all logical assignments to be used where possible (`"always"`)
  - Require equivalent `if` statements to be refactored to logical assignments (`enforceForIfStatements: true`)

This has the same motivation as `operator-assignment`. Logical assignments also prevent unnecessary assignments—if `a ??= b` where `a` is nullish, no assignment is made and no side effects are triggered.

### [`no-cond-assign`](https://eslint.org/docs/rules/no-cond-assign)

- Severity: error
- Configuration:
  - Always disallow assignments in conditions (`"always"`)

Assignments in conditionals are a common source of mistakes.

<!-- prettier-ignore -->
```ts
if (res.status = 404) {
  return "Not found";
}
// res.status becomes 404
```

There is never a case where putting assignments in conditionals does not significantly subtract from readability.

```ts
function setHeight(node: HTMLElement) {
  let someNode = node;
  do someNode.style.height = "100px";
  while ((someNode = someNode.parentNode));
  // ^ First parse: this is an equality test?
  // ^ Second parse: this is an assignment. Is that a mistake?
  // ^ Third parse: oh, it's intended because of the extra brackets
}
```

Always write assignments as a separate statement:

```ts
function setHeight(node: HTMLElement) {
  let someNode = node;
  while (someNode) {
    someNode.style.height = "100px";
    someNode = someNode.parentNode;
  }
}
```

It also permits us to use `while` instead of `do-while`, which is still a minor readability improvement.

There are some cases where assignments in conditionals are useful, such as to reduce code duplication:

```ts
let input;
while ((input = getInput())) {
  // ...
}
```

In such cases, you can either disable the rule, or use an explicit equality check (`while ((input = getInput()) !== null)`). We don't make ESLint special-case this because Prettier automatically adds braces, which means it's not going to end up reporting anything.

### [`no-multi-assign`](https://eslint.org/docs/rules/no-multi-assign)

- Severity: error
- Configuration:
  - Disallow all multiple assignments (`ignoreNonDeclaration: false`)

Do not chain assignments (`a = b = c = 1`). This is because Prettier will add parentheses, which makes the assignment not a "chain" anyway. Write multiple lines instead.

### [`no-plusplus`](https://eslint.org/docs/rules/no-plusplus)

- Severity: off

Use `a++` instead of `a += 1`. It's shorter and more idiomatic. However, generally do not rely on the return value of `++`/`--` as it can be confusing.

### [`no-return-assign`](https://eslint.org/docs/rules/no-return-assign)

- Severity: error
- Configuration:
  - Disallow all assignments in return statements (`"always"`)

Again, you should not rely on the return value of assignments. If you have something to assign to (`foo = ...`), then just return it on a separate statement (`return foo`). We don't use `except-parens` because Prettier will add parentheses anyway.

### [`no-self-assign`](https://eslint.org/docs/rules/no-self-assign)

- Severity: error
- Configuration:
  - Disallow all self-assignments (`props: true`)

Self-assignments are usually a no-op. Self-assignment to properties could be no-op but the case where it's not is very confusing to readers. If your property accessor is not idempotent, you should probably refactor it. If this API comes from a library, use a comment.

```ts
const obj = {
  get foo() {
    return Math.random();
  },
  set foo(value) {
    console.log(value);
  },
};

obj.foo = obj.foo; // ???
```

### [`operator-assignment`](https://eslint.org/docs/rules/operator-assignment)

- Severity: error
- Configuration:
  - Require all compound assignments to be used where possible (`"always"`)

Compound assignments enable you to write shorter code.

## Others

### [`no-implicit-coercion`](https://eslint.org/docs/rules/no-implicit-coercion)

- Severity: error
- Configuration:
  - Disallow all implicit coercions (`boolean: false, number: false, string: false, allow: []`)

Many "idioms" do not lead to correct or fool-proof code. The common case of `"" + x` [is plain wrong](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion). `+x` and `` `${x}` `` are not as user-friendly as `Number(x)` or `String(x)` because the former don't handle `BigInt` or `Symbol` types, respectively. Always use the longer form for readability and for maximum safety.

### [`no-sequences`](https://eslint.org/docs/rules/no-sequences)

- Severity: error
- Configuration:
  - Disallow all comma operators (`allowInParentheses: false`)

Don't use the comma operator unless in the updater of a `for` loop. Write multiple expressions using multiple statements.

- Don't use the comma operator just to make a concise arrow.
- Don't use the comma operator to discard the `this` binding; use the `call` method instead.
- Don't use the comma operator to trigger indirect `eval` (do you really need `eval`?). Use `eval?.()` or `Function` instead.

### [`no-void`](https://eslint.org/docs/rules/no-void)

- Severity: error
- Configuration:
  - Allow `void` as expression statements (`allowAsStatement: true`)

Generally, `void` operators are not needed. We don't need to use `void` to signify that we are discarding the return value; for example, in arrow functions, we can just be more explicit by expanding the arrow function body. However, we allow `void` as a statement because `@typescript-eslint/no-floating-promises` requires it to explicitly discard promises.

### [`valid-typeof`](https://eslint.org/docs/rules/valid-typeof)

- Severity: error
- Configuration:
  - Do not allow comparing to anything other than string literals or another `typeof` (`requireStringLiterals: true`)

You should only compare `typeof` to string literals. `typeof x === typeof y` is also considered a valid pattern. Other cases, such as saving the result of `typeof` to a variable, are too niche and not allowed by default by this rule, but you can disable the rule in that case.

Note that TypeScript disallows certain but not all invalid comparisons.

```ts twoslash
// @errors: 2367
declare const x: unknown;
declare const type: string;
typeof x === "str";
typeof x === 1;
typeof x === undefined; // Valid ???
typeof x === type;
```
