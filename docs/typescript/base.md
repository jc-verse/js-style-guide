---
sidebar_position: 3
---

# TypeScript

## Types

### [`array-type`](https://typescript-eslint.io/rules/array-type)

- Severity: error
- Configuration:
  - Require `T[]` syntax (`default: "array"`)

We require `T[]` syntax for arrays. This is a matter of consistency. Even for very, very complex types, we still require putting `[]` at the end, instead of using `Array<>`. If the rule provides more customization, such as allowing `(T | U)[]`, we may reconsider.

### [`consistent-indexed-object-style`](https://typescript-eslint.io/rules/consistent-indexed-object-style)

- Severity: error
- Configuration:
  - Require `{ [key: string]: T }` syntax (`"index-signature"`)

Always use the index signature syntax. It's not much longer:

```ts
type A = { [x: string]: T };
type B = Record<string, T>;
```

But it allows annotating the semantics of the key. Always use a descriptive name, such as `{ [url: string]: JSX.Element }`.

### [`method-signature-style`](https://typescript-eslint.io/rules/method-signature-style)

- Severity: error
- Configuration:
  - Require `foo: () => T` syntax (`"property"`)

The property syntax is strictly more type-safe. See the rule docs for more information. One exception allowed is when adding types for library methods, such as when polyfilling. This is because the lib declarations use methods anyway.

### [`no-explicit-any`](https://typescript-eslint.io/rules/no-explicit-any)

- Severity: warning

Never use `any`. If you trace the assignability of your types carefully, you should always be able to find a suitable type. Only able to use `any` is a sign of overcomplicated API design. It is only set to warning because we acknowledge the necessity of `any`, such as when indexing an unknown object.

### [`no-invalid-void-type`](https://typescript-eslint.io/rules/no-invalid-void-type)

- Severity: warning
- Configuration:
  - Do not allow `void` as `this` (`allowAsThisParameter: false`)
  - Allow `void` in generic type arguments (`allowInGenericTypeArguments: true`)

Only use `void` as the return type of functions. In other places, `void` behaves like `unknown` and is not type safe. We allow `void` in generic type arguments because it is useful for `Promise<void>`. However, do not write `this: void`—if you don't care about the `this` value, just omit the `this` parameter.

### [`no-misused-new`](https://typescript-eslint.io/rules/no-misused-new)

- Severity: error

Do not declare a method called `new` in a class. Do not declare a method called `constructor` in an interface. This is probably a mistake and you meant to declare a constructor in both cases.

### [`prefer-function-type`](https://typescript-eslint.io/rules/prefer-function-type)

- Severity: error

Use `type Foo = () => T` instead of `interface Foo { (): T }`. The former is more readable while the latter may be simply due to missing a property name. If you want to make an augmentable callable type, use a disable comment.

```ts
interface Plugin {
  (ast: AST): AST;
}

// User code
interface Plugin {
  extension1: MyExtension;
}
```

## Type/value declarations

### [`consistent-type-definitions`](https://typescript-eslint.io/rules/consistent-type-definitions)

- Severity: off

We don't mind whether `interface` or `type` is used. Generally:

- Use `interface` for public APIs that are extendable so that users may be able to declaration-merge.
- Use `interface` for large object types.
- Use `type` for convenience types that are small.

### [`no-empty-object-type`](https://typescript-eslint.io/rules/no-empty-object-type)

- Severity: warning
- Configuration:
  - Allow extended interfaces to be empty (`allowInterfaces: "with-single-extends"`)
  - Do not allow empty object literal types (`allowObjectTypes: "never"`)
  - No exceptions proposed, but you can add your own (`allowWithName: undefined`)

Empty interfaces are a form of `{}`, which match any non-nullish type. However, we allow `interface X extends Y {}` as a way to alias interfaces, because then we can declaration-merge `X`.

It is only set to warning because there are cases where empty object types are useful, when you actually mean any non-nullish object. It's only an FYI for you to consider alternatives.

### [`no-redeclare`](https://typescript-eslint.io/rules/no-redeclare)

- Severity: error
- Configuration:
  - Allow declaration merging (`ignoreDeclarationMerge: true`)
- Related:
  - [`no-redeclare`](../eslint-base/variables-names.md#no-redeclare)

This reduces the errors reported by the base rule. It is safe to use in JavaScript files because it does not change behaviors outside of TypeScript.

We allow "declaration merging" between variables and types:

```ts
const User = z.object({});
type User = z.infer<typeof User>;
```

If the rule reports for this case and it really makes sense, you can disable the rule for that line. ([typescript-eslint/typescript-eslint#6441](https://github.com/typescript-eslint/typescript-eslint/issues/6441))

### [`no-unused-vars`](https://typescript-eslint.io/rules/no-unused-vars)

- Severity: error
- Related:
  - [`no-unused-vars`](../eslint-base/variables-names.md#no-unused-vars)

See the base rule for more information. This extension rule adds support for TypeScript-specific syntax so it is safe to use in JavaScript files too.

## Functions

### [`adjacent-overload-signatures`](https://typescript-eslint.io/rules/adjacent-overload-signatures)

- Severity: error

We require overload signatures to be adjacent to each other. This makes the signatures of functions easier to read. Note that the rule has a known bug: [typescript-eslint/typescript-eslint#4576](https://github.com/typescript-eslint/typescript-eslint/issues/4576).

### [`unified-signatures`](https://typescript-eslint.io/rules/unified-signatures)

- Severity: warning
- Configuration:
  - Do not allow differently named parameters as distinct overloads (`ignoreDifferentlyNamedParameters: false`)

You should only use overloads to associate input with output, or associate multiple inputs. Combine signatures as much as possible, because doing so allows passing a union.

```ts twoslash
// @errors: 2769
function doSomething(id: number): void;
function doSomething(ids: number[]): void;
function doSomething(ids: number | number[]): void {
  // ...
}

declare const maybeIds: number | number[];
doSomething(maybeIds); // Error
```

```ts twoslash
// @errors: 2769
function doSomething(ids: number | number[]): void {
  // ...
}

declare const maybeIds: number | number[];
doSomething(maybeIds); // Error
```

In case the two overloads have very distinct semantics, name the parameter as `lengthOrElement` instead of creating two overloads with different names.

## Generics

### [`consistent-generic-constructors`](https://typescript-eslint.io/rules/consistent-generic-constructors)

- Severity: error
- Configuration:
  - Require `new Foo<T>()` syntax (`"constructor"`)

Use `const foo = new Foo<T>()` instead of `const foo: Foo<T> = new Foo()`. It is shorter and less prone to refactoring.

### [`no-unnecessary-type-constraint`](https://typescript-eslint.io/rules/no-unnecessary-type-constraint)

- Severity: error

Do not write `T extends unknown` or `T extends any`. They are completely redundant as of the latest TS version (`T extends unknown` may not be in older versions when generic types were non-nullable by default).

## Classes

### [`class-literal-property-style`](https://typescript-eslint.io/rules/class-literal-property-style)

- Severity: warning
- Configuration:
  - Require using getters for readonly fields (`"getters"`)

We require using getters for readonly fields.

- `readonly` only provides safety in TypeScript but does not interface well with JavaScript.
- `readonly` cannot be declared in JavaScript, so enforcing `"fields"` may lead to unfixable errors in JavaScript.
- Getters can be overridden in subclasses while fields may accidentally override subclass getters.

Note that our [`accessor-pairs`](../eslint-base/objects-classes.md#accessor-pairs) rule requires every getter to have an accompanying setter. You may want to disable this in TypeScript to achieve compile-time readonliness.

### [`explicit-member-accessibility`](https://typescript-eslint.io/rules/explicit-member-accessibility)

- Severity: off

Never annotate member accessibility. If you want private members, use `#` instead of `private`. Public fields are allowed and not discouraged or unfavored over accessors.

### [`no-extraneous-class`](https://typescript-eslint.io/rules/no-extraneous-class)

- Severity: warning
- Configuration:
  - Do not allow classes with only constructors (`allowConstructorOnly: true`)
  - Do not allow empty classes (`allowEmpty true`)
  - Do not allow classes with only static members (`allowStaticOnly: true`)
  - Do not allow classes with decorators (`allowWithDecorator: true`)

You should not use classes as namespaces. All classes should have at least one _method_, because if it only contains fields, a factory function is probably better. Also consider whether the style of utility functions + data is better than a class.

Note that in JavaScript you may have false positives:

```js
class A {
  constructor() {
    this.a = 1;
  }
}
```

You should not do this in JavaScript. Add a field declaration to make the class statically analyzable—this helps with performance by preventing unnecessary hidden class transitions.

```js
class A {
  a;
  constructor() {
    this.a = 1;
  }
}
```

### [`parameter-properties`](https://typescript-eslint.io/rules/parameter-properties)

- Severity: warning
- Configuration:
  - Always use class properties (`prefer: "class-property"`)
  - Allow no exceptions (`allow: []`)

Don't use parameter properties because they don't save many characters but are non-standard. Different TypeScript versions may change the instantiation order and subtly break your code.

```ts
class A {
  b = this.a; // Will this work?
  constructor(public a: number) {}
}

class B {
  a;
  b;
  constructor(a: number) {
    this.a = a;
    this.b = a; // This will work
  }
}
```

## Enums

### [`prefer-enum-initializers`](https://typescript-eslint.io/rules/prefer-enum-initializers)

- Severity: error

Always use initializers for enum members. Without initializers, you may subtly break consumers' code if they rely on the exact value of each member.

```diff
enum Rights {
+ NONE,
  USER,
  ADMIN,
}

if (user.right === 1) {
  // Before: user rights
  // Now: no rights
}
```

### [`prefer-literal-enum-member`](https://typescript-eslint.io/rules/prefer-literal-enum-member)

- Severity: warning
- Configuration:
  - Allow bitwise enum members (`allowBitwiseExpressions: true`)

Using non-literal members is confusing because people may not expect enums to create naming scopes. If you want to declare enums depending on other variables, consider a namespace instead. We allow bitwise enum members because they are useful for flags.

```ts
enum Flags {
  A = 1 << 0,
  B = 1 << 1,
  C = 1 << 2,
}
```

## Namespaces

### [`no-namespace`](https://typescript-eslint.io/rules/no-namespace)

- Severity: off

We don't forbid namespaces. We think they enable interesting use cases such as aggregating types and values. However, we do not recommend using them as a way to organize code. Use ES modules instead. You should only use them if the namespace's name itself is part of the API.

However, if you use namespaces, don't use the `module` keyword. This is enforced by the [`prefer-namespace-keyword`](#prefer-namespace-keyword) rule.

### [`prefer-namespace-keyword`](https://typescript-eslint.io/rules/prefer-namespace-keyword)

- Severity: error

Always use `namespace` instead of `module`. `module` declarations are soon to be a JavaScript feature and will cause compatibility issues.

## Imports

### [`consistent-type-imports`](https://typescript-eslint.io/rules/consistent-type-imports)

- Severity: error
- Configuration:
  - Allow `: import(...)` style (`disallowTypeAnnotations: false`)
  - Fix to inline type imports (`fixStyle: "inline-type-imports"`)
  - Require `import type` syntax (`prefer: "type-imports"`)

Use `import type` to clearly signal that the import is only used for type information. This is useful for import elision. We fix to inline type imports to avoid separate statements, and we always use non-legacy TypeScript versions. If all imports are fixed to inline type imports, [`no-import-type-side-effects`](#no-import-type-side-effects) will fix this to `import type` automatically.

We allow `: import(...)` style type annotations. This is useful in an ambient context where import statements are not allowed.

### [`no-import-type-side-effects`](https://typescript-eslint.io/rules/no-import-type-side-effects)

- Severity: error

Do not write `import { type X } from "..."`. Instead, always use `import type` if only types are imported from the module. Note that this may spontaneously arise from auto-fixing [`consistent-type-imports`](#consistent-type-imports) due to our use of `fixStyle: "inline-type-imports"`.

### [`no-require-imports`](https://typescript-eslint.io/rules/no-require-imports)

- Severity: error
- Disabled in JavaScript

Do not use `require` in TypeScript because if you use `const x = require(...)` then there will be no types. `import x = require(...)` is fully obscure with `esModuleInterop`. However, you may use `require` in JavaScript if you are authoring CommonJS.

## Exports

### [`no-useless-empty-export`](https://typescript-eslint.io/rules/no-useless-empty-export)

- Severity: error

Do not export an empty list unless it helps to make the file a module. If the file is a `.ts` file (not a declaration) and it contains other imports/exports, then this `export {};` statement is not necessary.

## Type annotations

### [`explicit-function-return-type`](https://typescript-eslint.io/rules/explicit-function-return-type)

- Severity: off

We don't require explicit return types for functions. Let TypeScript infer as much as possible to reduce verboseness. We do require explicit module boundary types, though.

### [`explicit-module-boundary-types`](https://typescript-eslint.io/rules/explicit-module-boundary-types)

- Severity: warning
- Disabled in JavaScript

We require explicit module boundary types. This makes sure that any module boundary is type safe. Although 90% of the time this "boundary" is actually internal, it still helps us to prevent any accidental public API changes.

### [`typedef`](https://typescript-eslint.io/rules/typedef)

- Severity: off

This rule is too strict and does not allow type inference. Let TypeScript infer types where it can, and only add types for consistency, clarity, or narrower types. Always compile with `noImplicitAny`.

## Type assertions

### [`consistent-type-assertions`](https://typescript-eslint.io/rules/consistent-type-assertions)

- Severity: error
- Configuration:
  - Require `as T` syntax (`assertionStyle: "as"`)
  - Allow object literal values to have asserted type anywhere (`objectLiteralTypeAssertions: "allow"`)

Use `as T` instead of `<T>`. The latter is soft-deprecated because it does not work in JSX. The former is also easier to read and easier to search for.

We allow object literals to be asserted everywhere. We don't think there's any difference between `const x = {} as T` and `const x = y as T`, so if the latter is allowed, so should the former.

However, remember **use `as T` only when you are sure that the type is correct**. It is not type safe and can lead to runtime errors.

### [`no-confusing-non-null-assertion`](https://typescript-eslint.io/rules/no-confusing-non-null-assertion)

- Severity: error

You should never use `!` in a comparison, because it does not change the comparison outcome or type checking.

### [`no-extra-non-null-assertion`](https://typescript-eslint.io/rules/no-extra-non-null-assertion)

- Severity: error

Never use `!!` because it is redundant. We don't forbid `!` so there's no point in screaming "this is really non-null!!"

### [`no-non-null-asserted-nullish-coalescing`](https://typescript-eslint.io/rules/no-non-null-asserted-nullish-coalescing)

- Severity: error

Do not use non-null assertions on a nullish coalescing LHS. This defeats the purpose.

### [`no-non-null-asserted-optional-chain`](https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain)

- Severity: error

Do not use non-null assertions at the end of an optional chain. Sometimes this is necessary, for example, when passing a value to a function that actually handles `undefined` but does not declare it in the type, but in most cases, it is not necessary and doing so masks potential bugs.

### [`no-non-null-assertion`](https://typescript-eslint.io/rules/no-non-null-assertion)

- Severity: off

There are a significant number of places where non-null assertions are inevitable:

**Weak built-in types**

Some TypeScript lib types are not accurate. One common example is regular expressions. The discussion is in [microsoft/TypeScript#32098](https://github.com/microsoft/TypeScript/issues/32098).

```ts twoslash
declare const commit: string;
// @errors: 2532
// ---cut---
const author = commit.match(/(?<name>.+),(?<time>\d+)/)?.groups.name;
// But I know that `name` always exists in `groups`!
```

**Control-flow analysis failure**

Control-flow analysis is not preserved across callback boundaries, because TypeScript cannot predict when a callback will be called. See [microsoft/TypeScript#9998](https://github.com/microsoft/TypeScript/issues/9998)

```ts twoslash
// @errors: 2721
import { useRef } from "react";

function useDemo() {
  const ref = useRef<(a: number) => void>(null);
  if (ref.current) {
    // Do other stuff...
    [1, 2, 3].forEach((a) => ref.current(a));
    // But I just checked `ref.current`!
  }
}
```

**Clearer developer intention**

Sometimes, you are really sure that a value exists, but TypeScript doesn't believe you.

```ts twoslash
// @errors: 2532
const managers = [
  { name: "npm", lockFile: "package-lock.json" },
  { name: "yarn", lockFile: "yarn.lock" },
  { name: "pnpm", lockFile: "pnpm-lock.yaml" },
] as const;
const lockFile = managers.find((obj) => obj.name === "npm").lockFile;
// It absolutely exists, but making it strongly typed is unnecessary trouble
```

This is also related to the previous two points in many cases, but in other cases where TypeScript cannot ensure existence with control-flow analysis, we need to convey developer intent through allowing `undefined` or not.

### [`prefer-as-const`](https://typescript-eslint.io/rules/prefer-as-const)

- Severity: error

Use `x as const` instead of `x as x` when `x` is a literal. This is because `as const` is more type safe and more readable.

## TS comments

### [`ban-ts-comment`](https://typescript-eslint.io/rules/array-type)

- Severity: error
- Configuration:
  - Allow `@ts-check`; require `@ts-expect-error` to have a description; disallow `@ts-ignore` and `@ts-nocheck`
  - Require descriptions to be at least 3 characters long (`minimumDescriptionLength: 3`)

You should never use `@ts-ignore` or `@ts-nocheck`. They completely turn off the checker and have no sense of granularity. `@ts-expect-error` is better because it requires an error to be present, but it is still dangerous an should only be applied when there cannot be any other type errors.

### [`triple-slash-reference`](https://typescript-eslint.io/rules/triple-slash-reference)

- Severity: error
  - Never allow `/// <reference lib="..." />` (`lib: "never"`)
  - Never allow `/// <reference path="..." />` (`path: "never"`)
  - Allow `/// <reference types="..." />` when the file has no import (`types: "prefer-import"`)

You should generally use modules instead of triple-slash references. `/// <reference path="..." />` can be substituted with a side-effect import. `/// <reference lib="..." />` can be substituted with the `lib` compiler option. `/// <reference types="..." />` can be substituted with an import, except when you want to load ambient declarations, such as `declare module` and `declare global`. In this case, the triple slash reference should always live in an ambient declaration itself.

## Plain JavaScript

These rules probably shouldn't be in typescript-eslint in the first place.

### [`no-dynamic-delete`](https://typescript-eslint.io/rules/no-dynamic-delete)

- Severity: off

`delete` is necessary for transforming objects:

```ts
for (const key of Object.keys(obj)) {
  delete obj[key];
}
```

### [`no-this-alias`](https://typescript-eslint.io/rules/no-this-alias)

- Severity: warning
- Configuration:
  - Allow destructuring values from `this` (`allowDestructuring: true`)
  - Do not allow any particular alias (`allowedNames: []`)
- Related:
  - [`consistent-this`](../eslint-base/functions.md#consistent-this)

You should generally avoid `this` aliasing because it is rare to rely on nested `this` values. In case when this is actually necessary, you should use a semantic name instead of `self` or `that`.

### [`prefer-for-of`](https://typescript-eslint.io/rules/prefer-for-of)

- Severity: error

Use a `for-of` loop instead of `for` when the pattern is clearly convertible. Note that this rule is not 100% safe as not every indexed collection is iterable.
