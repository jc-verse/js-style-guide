---
sidebar_position: 6
---

# Functions

This page concerns styles for authoring functions, including the syntax for function declarations, arrow functions, and methods.

## When to create functions

The guide is: **do not over-abstract**. For example, this kind of code produces unnecessary runtime overhead, and more importantly, mental burden:

```ts
function resolveTarget(filePath: string) {
  // ^ What does `resolveTarget` do?
  return filePath.endsWith(".js")
    ? `./build/js/${filePath}`
    : `./build/asset/${filePath}`;
  // ^ It seems to return a different path when the extension is different, but
  //   where is it useful?
}

async function copyFile(filePath: string) {
  // ^ `copyFile` sounds like a really generic name. Is it used in multiple places?
  //   Should I take caution when refactoring?
  const targetPath = resolveTarget(filePath);
  // ^ What does `resolveTarget` do again? *Going back to definition* Now I know
  //   what it does, but the code is so long (not in this dumbed-down example),
  //   I can't compare them side-by-side and understand exactly what the code
  //   does step-by-step at a glance
  await fs.copyFile(filePath, targetPath);
  console.log(`Copied ${filePath}`);
}

await Promise.all(files.map(copyFile));
// ^ Does `copyFile` only do `fs.copyFile`? *Going back to definition* No, it
//   does much more. Of course I can name it as `copyFileToResolvedTargetAndLog`,
//   but then what's the point of abstraction?
```

When you could just simply put everything into a single lambda and it still makes sense:

```ts
await Promise.all(files.map(async (filePath) => {
  const targetPath = filePath.endsWith('.js')
    ? `./build/js/${filePath}`
    : `./build/asset/${filePath}`;
  await fs.copyFile(filePath, targetPath);
  console.log(`Copied ${filePath}`);
})));
```

Keep in mind the rule of "code for the average-intelligent". When a sequence of operations is self-explanatory, you don't need to extract it into a separate function just to give it a name that mirrors exactly what's described with code.

In addition, **do not export a function just to test it**.

```ts title="copyFile.ts"
// Is it used in multiple modules? Should I take caution when refactoring?
// *Doing a global search* It's only used in this module and its accompanied
// test file. But if I remove the `export`, I have to refactor the tests and
// risk reduced test coverage. Yuck!
export function resolveTarget(filePath: string) {
  return filePath.endsWith(".js")
    ? `./build/js/${filePath}`
    : `./build/asset/${filePath}`;
}
```

```ts title="copyFile.test.ts"
import { resolveTarget } from "./copyFile";

// Testing this function simply because tests are easy to write
describe("resolveTarget", () => {
  it("works", () => {
    expect(resolveTarget("foo.js")).toEqual("./build/js/foo.js");
  });
});
```

Tests are made for public APIs (or at least the useful functions that other internal modules use), not for internal implementations. Implementations may be refactored at any time and intermediate functions come and go, so don't tie your tests to them. Mock side-effects like `fs.readFile` or provide fixtures instead of staying in the comfort zone of testing pure functions.

Keep in mind that refactoring doesn't only mean changing the implementations of existing functions or modules, but also removing and adding them. It is critical to make clear which downstream dependents will be affected.

## Declaration

### [`func-style`](https://eslint.org/docs/rules/func-style)

- Severity: warning
- Configuration:
  - Use function declaration over function expression (`"declaration"`)
  - Allow arrow functions when using expressions (`allowArrowFunctions: true`)
  - Disallow type-annotated function expressions (`allowTypeAnnotation: false`)

We allow two kinds of functions: function declarations and arrow functions. There are some additional restrictions:

- At the top level, do not use `const func = () => ...`. Always use `function func() { ... }`, unless you need to type the function as a whole. This makes the code visually more balanced. This restriction is relaxed in nested functions (especially event listeners in React components).
- We allow function expressions in the rare case of declaring extra methods, such as `Foo.prototype.bar = function () { ... }`. This should be exceedingly rare but they are allowed by the rule nonetheless. However, if the "method" doesn't rely on `this`, prefer using arrow functions.
- To declare function properties in an object literal, use the method syntax `{ foo() { ... } }` instead of arrow functions `{ foo: () => ... }` to make it appear shorter. Exceptions are allowed if using arrow functions allows using concise body which saves lines. This is enforced by [`object-shorthand`](./objects-classes.md#object-shorthand).

Do not use the syntax `const foo: Type = function () { ... }`; still prefer the arrow function syntax `const foo: Type = () => ...` if you need to type the function as a whole. In the rare case where the function needs to be named or uses `this`, use a function expression and disable the rule.

### [`no-func-assign`](https://eslint.org/docs/rules/no-func-assign)

- Severity: error
- Related:
  - `ts(2630): Cannot assign to 'a' because it is a function.`

The reason is the same as [`no-class-assign`](./objects-classes.md#no-class-assign). If you want to wrap your function, create a new variable instead.

```ts
function Component() {}
const ComponentMemo = React.memo(Component);
// Or directly:
export default React.memo(Component);
```

### [`no-inner-declarations`](https://eslint.org/docs/rules/no-inner-declarations)

- Severity: off

Block-scoped vars are already reported by [`block-scoped-var`](./variables-names.md#block-scoped-var). Function declarations inside blocks behave as expected in strict mode, so there's no good reason to forbid them.

### [`no-loop-func`](https://eslint.org/docs/rules/no-loop-func)

- Severity: off

While this rule could prevent bugs in theory, we think in the vast majority of cases, a closure is actually intended to read the latest value instead of the value at the time the function was created. In addition, many functions are synchronously called (such as array methods) and the rule just false-positives. If stale references actually cause bugs, you should catch them through tests.

### [`prefer-arrow-callback`](https://eslint.org/docs/rules/prefer-arrow-callback)

- Severity: error
- Configuration:
  - Do not allow named function expressions (`allowNamedFunctions: true`)
  - Use arrow functions even when the function expression references `this` (`allowUnboundThis: true`)

Always use arrow callbacks. If the callback relies on the `this` value or needs to be named, use a function declaration instead. Use of function expressions may be a sign of legacy code or unfamiliarity with the language.

## Names

### [`func-names`](https://eslint.org/docs/rules/func-names)

- Severity: warning
- Configuration:
  - Require function expressions to be named if one can't be inferred (`"as-needed"`)

In the same vein as `func-name-matching`, this rule is to ensure the readability of the stack trace and the reliability of the `func.name` property.

### [`func-name-matching`](https://eslint.org/docs/rules/func-name-matching)

- Severity: warning
- Configuration:
  - Always require the function expression's name to match the variable it's assigned to. (`"always"`)
  - Check function expressions used in property descriptors (`considerPropertyDescriptor: true`)
  - Allow CommonJS exports to be named differently (`includeCommonJSModuleExports: false`)

Although we rarely use function expressions and always prefer either arrow functions or declarations, in cases where function expressions are necessary, the variable name should match the name of declaration. It's mostly to ensure that the error stack is always as expected: the variable name does not appear in the stack trace and may result in obscure call stacks.

```ts
const foo = function longFoo() {
  console.log("pass");
};
const foo2 = function longFoo() {
  throw new Error("panic");
};
function bar() {
  foo();
  foo2();
}
bar();
// This throws error stack:
// Error: panic
//     at longFoo (...)
//     at bar (...)
```

The `longFoo` is ambiguous. Although there's also a source position in the stack trace, it's better if we can instantly recognize the offending code when handling bug reports containing stack traces.

## Bodies

### [`max-lines-per-function`](https://eslint.org/docs/rules/max-lines-per-function)

- Severity: off

See our opinion on [complexity](./control-flow.md#complexity).

### [`max-nested-callbacks`](https://eslint.org/docs/rules/max-nested-callbacks)

- Severity: off

See our opinion on [complexity](./control-flow.md#complexity).

### [`no-empty-function`](https://eslint.org/docs/rules/no-empty-function)

- Severity: off

We allow empty functions, because they are frequently needed for no-op callbacks.

## Parameters & arguments

### [`default-param-last`](https://typescript-eslint.io/rules/default-param-last)

- Severity: error
- Disabled in JavaScript
- Related:
  - `ts(1016): A required parameter cannot follow an optional parameter.`

In TypeScript files, we require default parameters to be at the end of the parameter list. This is because required parameters must be passed values, so optional parameters before them have no effect and should just have `| undefined` in their types. In JavaScript, we don't require this because it is not possible to indicate optionality except through default values.

### [`max-params`](https://eslint.org/docs/rules/max-params)

- Severity: off

See our opinion on [complexity](./control-flow.md#complexity). However, you should actively consider if you actually need many parameters. In the case when the number of parameters gets large, consider using an object instead.

### [`no-caller`](https://eslint.org/docs/rules/no-caller)

- Severity: error

From the ESLint docs:

> The use of `arguments.caller` and `arguments.callee` make several code optimizations impossible. They have been deprecated in future versions of JavaScript and their use is forbidden in ECMAScript 5 while in strict mode.

### [`no-dupe-args`](https://eslint.org/docs/rules/no-dupe-args)

- Severity: error
- Related:
  - `SyntaxError: Duplicate parameter name not allowed in this context`
  - `ts(2300): Duplicate identifier 'a'.`

Duplicate parameter names are a syntax error in strict mode.

### [`no-param-reassign`](https://eslint.org/docs/rules/no-param-reassign)

- Severity: off

We think it's fine to reassign parameters, particularly for normalization purposes, if you are interfacing with external code.

```ts
function add(a: number, b: number) {
  a = Number(a); // Make sure `a` and `b` are actually numbers
  b = Number(b);
  return a + b;
}
```

Do not reassign parameters if it drastically changes the semantics of the parameter. In TypeScript, you cannot change the type of the parameter, and you should strive to do the same in JavaScript.

### [`prefer-rest-params`](https://eslint.org/docs/rules/prefer-rest-params)

- Severity: error

Use rest parameters instead of `arguments`. Rest parameters are more versatile because they are real arrays, and can be used in arrow functions.

The only known exception is you want to use the arguments both named and as an array:

```ts
const p = new Proxy(
  {},
  {
    get(target, prop, receiver) {
      console.log(target === receiver);
      return Reflect.get.apply(undefined, arguments);
    },
  },
);
```

You can selectively choose to disable the rule in this case, or destructure the variables from the rest params:

```ts
const p = new Proxy(
  {},
  {
    get(...args) {
      const [target, prop, receiver] = args;
      console.log(target === receiver);
      return Reflect.get(...args);
    },
  },
);
```

Note however that this changes the arity of the function, which may break some code.

### [`prefer-spread`](https://eslint.org/docs/rules/prefer-spread)

- Severity: error

Use spread syntax instead of `Function.prototype.apply`. Note however that this rule does not flag patterns such as `Math.max.apply(undefined, args)`, although the `apply` is still redundant.

## Return statements

### [`consistent-return`](https://eslint.org/docs/rules/consistent-return)

- Severity: error
- Configuration:
  - Require not declaring `undefined` in return statement if not needing a return value (`treatUndefinedAsUnspecified: false`)
- Related:
  - `ts(7030): Not all code paths return a value.` (with [`noImplicitReturns`](https://www.typescriptlang.org/tsconfig#noImplicitReturns))

We require all return statements to be either explicitly returning a value or implicitly returning `undefined` (in case of `void`-returning functions). Because most of our code is already type-checked by TypeScript, which surfaces the implicitly returned `undefined` in the return type, this rule is more for aesthetic purposes. It also helps us find all possible return values at a glance.

`return voidFunction()` is also not allowed. Use `voidFunction(); return;` instead. This makes it easier to tell if a function is returning a value or not. For this reason, we turn off the typescript-eslint rule `@typescript-eslint/consistent-return`, because it needs type information and is not useful for our style.

### [`no-useless-return`](https://eslint.org/docs/rules/no-useless-return)

- Severity: error

Do not use `return` when it doesn't change the control flow of the function.

## Arrow functions

### [`arrow-body-style`](https://eslint.org/docs/rules/arrow-body-style)

- Severity: error
- Configuration:
  - Require omitted braces and implicit return when possible (`"as-needed"`)
  - Do not treat object literals as special case (`requireReturnForObjectLiteral: false`)

Implicit returning is much cleaner.

```ts
const peopleWithIDs = people.map((p, id) => ({ ...p, id }));
```

Useless braces and `return`s can be artifacts from refactoring, which increases indentation and line count without much value. Enforcing implicit return also encourages future refactors to fit logic within one expression instead of using multiple assignments and control flow.

## `this`

### [`consistent-this`](https://eslint.org/docs/rules/consistent-this)

- Severity: off
- Related:
  - [`@typescript-eslint/no-this-alias`](../typescript/base.md#no-this-alias)

We warn against `this` aliasing altogether, but when it's inevitable (for example, you need two `this` values within one function), you should use a semantic name instead of `self` or `that`.

```ts
class Foo {
  bar(str) {
    const fooInstance = this;
    return JSON.parse(str, function (key, value) {
      if (typeof value !== "string") return value;
      return (
        value
          .replace(/\{\{name\}\}/g, fooInstance.name)
          // The `this` here is the object that `key` belongs to
          .replace(
            /\{\{(?<prop>.*?)\}\}/g,
            (m, p1, o, s, groups) => this[groups.prop],
          )
      );
    });
  }
}
```

### [`no-extra-bind`](https://eslint.org/docs/rules/no-extra-bind)

- Severity: error

You should only use `bind` (with one argument) when the `this` value is actually significant. Do not use it on arrow functions or functions that don't use `this`.

### [`no-invalid-this`](https://eslint.org/docs/rules/no-invalid-this)

- Severity: off

This rule has too many false positives, because many callbacks are called with a valid `this`:

```ts
JSON.parse(str, function (key, value) {
  if (typeof value !== "string") return value;
  return value.replace(/\{\{name\}\}/g, this.name);
});
```

Even in TypeScript files, we don't need this rule, because this rule falls into a dilemma:

- In TypeScript files, its utility clashes exactly with the TypeScript compiler if one adds the `this` parameter anyway;
- In JavaScript files, it does not prevent any additional false positives.

### [`no-useless-call`](https://eslint.org/docs/rules/no-useless-call)

- Severity: error

Do not use `call` or `apply` when it doesn't change the `this` value of the function. Before spreading, you may have to use `foo.apply(undefined, args)`, but now you can simply use `foo(...args)` (although this is not checked by the rule).
