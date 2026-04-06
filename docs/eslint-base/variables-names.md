---
sidebar_position: 3
---

# Variables & names

This page discusses rules around variable declaration, use of properties, and naming.

## Variable declarations

### [`block-scoped-var`](https://eslint.org/docs/rules/block-scoped-var)

- Severity: error

Because `var`s are forbidden altogether, this rule is mostly moot. In the rare case where you need to use `var` (such as to declare globals), such vars should not be deceptively inside a block.

### [`init-declarations`](https://eslint.org/docs/rules/init-declarations)

- Severity: error
- Configuration:
  - Require variables to be initialized (`"always"`)
- Related:
  - [`@typescript-eslint/init-declarations`](../typescript/base.md#init-declarations)
  - `ts(2454): Variable 'a' is used before being assigned.`

We require variables to be initialized. Otherwise, it's possible to circumvent TypeScript:

```ts twoslash
let a: number;
function useA() {
  console.log(a); // -> undefined
}
useA();
a = 1;
```

You should almost always initialize variables upfront (and use `const` where possible). Use ternaries instead of `if...else`. If you need to lazy initialize a variable, initialize it to `undefined`, so that you remember to explicitly check for `undefined` before using it.

### [`no-const-assign`](https://eslint.org/docs/rules/no-const-assign)

- Severity: error
- Related:
  - `ts(2588): Cannot assign to 'a' because it is a constant.`

Re-assigning const variables causes a runtime error.

```ts twoslash
// @errors: 2588
const a = 1;
a = 2; // -> TypeError: Assignment to constant variable.
```

### [`no-empty-pattern`](https://eslint.org/docs/rules/no-empty-pattern)

- Severity: error
- Options:
  - Disallow empty patterns in parameters (`allowObjectPatternsAsParameters: false`)

Empty destructuring patterns don't create any variables. If you intend to drop the property entirely, just write it directly, since [`no-unused-vars`](#no-unused-vars) allows unused variables as rest siblings.

```ts
// Instead of this:
function foo({ a: {}, ...props }: Props) {}

// Write this:
function foo({ a, ...props }: Props) {}
```

### [`no-implicit-globals`](https://eslint.org/docs/rules/no-implicit-globals)

- Severity: error
- Configuration:
  - Disallow global lexical declarations too (`lexicalBindings: true`)

We have forbidden using `var`. `let` and `const` at the top level also behave weirdly due to TDZ. You should probably be modularizing your code anyway.

### [`no-redeclare`](https://eslint.org/docs/rules/no-redeclare)

- Severity: error
- Configuration:
  - Check redeclaration of globals (`builtinGlobals: false`)
- Related:
  - [`@typescript-eslint/no-redeclare`](../typescript/base.md#no-redeclare)

Do not redeclare `var`/`function`. This is probably a mistake. Note that `let`/`const` cannot be redeclared and doing so is a syntax error in the first place.

### [`no-shadow`](https://eslint.org/docs/rules/no-shadow)

- Severity: warning
- Configuration:
  - Ignore shadowing of globals (`builtinGlobals: true`)
  - Check shadowing of all variables declared in the outer scope (`hoist: "all"`)
  - Allow shadowing of uninitialized variables (`ignoreOnInitialization: true`)
  - Do not allow function type parameter name to shadow another variable (`ignoreFunctionTypeParameterNameValueShadow: false`)
  - Ignore type declarations and value declarations shadowing each other (`ignoreTypeValueShadowing: true`)

We avoid shadowing because doing so is a refactoring hazard.

```ts
function foo(x) {
  doSomething((x) => {
    console.log(x); // What is this x meant to be?
    // If I change the parameter name, should I change this too?
  });
}
```

The issue isn't better because the variable is only declared afterwards.

```ts
function foo() {
  doSomething((x) => {
    console.log(x); // What is this x meant to be?
    // If I change the parameter name, should I change this too?
  });
  // If I move this declaration before doSomething(), there
  // shouldn't be a difference
  const x = 1;
}
```

However, shadowing is allowed when the variable is initialized later. The following pattern is encouraged:

```ts
const x = (() => {
  let x = 0;
  // ...
  return x;
})();
```

We allow shadowing globals—this is for a pragmatic concern. There are some extremely generically named globals like `name` and `Plugin` which we don't want to prevented from being used as local variables. However, you should probably avoid using names like `fetch`.

We allow type declarations and value declarations to shadow each other. This is because they are in different namespaces and you always access each one with a different syntax. However, a function parameter name always lives in value space even when it belongs in a type, so we don't allow it to shadow another variable.

```ts
const test = 1;
type Func = (test: string) => typeof test; // What is `test` here?
```

### [`no-unassigned-vars`](https://eslint.org/docs/rules/no-unassigned-vars)

- Severity: error

The [`init-declarations`](#init-declarations) rule already requires variables to be initialized. In cases where you do want the variable to be initialized later, this rule prevents you from accidentally forgetting to initialize it at all. It requires the variable to be eventually assigned somewhere, although it doesn't guarantee that the assignment happens before the variable is used, or the assignment executes at all.

### [`no-var`](https://eslint.org/docs/rules/no-var)

We disallow `var` statements. `var` is fully predated by `let`/`const` and its hoisting behavior makes code harder to debug. There's not a single reason to use `var` today. If you need to share one variable between two blocks, declare it in the upper scope. If you need to declare a global variable (which you probably shouldn't anyway), directly modify `globalThis` (which also works in modules).

```ts twoslash
declare var globalVar: number;
globalThis.globalVar = 1;
```

### [`no-undef-init`](https://eslint.org/docs/rules/no-undef-init)

- Severity: off

We _require_ variables to be initialized (through `init-declarations`). In case there's no reasonable default value, you should use explicit `undefined`.

### [`no-unused-vars`](https://eslint.org/docs/rules/no-unused-vars)

- Severity: error
- Configuration:
  - Check unused trailing function parameters (`args: "after-used"`)
  - Check unused caught errors (`caughtErrors: "all"`)
  - Check unused classes containing static initialization blocks (`ignoreClassWithStaticInitBlock: false`)
  - Ignore unused variables with rest element (`ignoreRestSiblings: true`)
  - Check unused `using` declarations (`ignoreUsingDeclarations: false`)
  - Check unused variables in the top-level scope (`vars: "all"`)
- Related:
  - [`@typescript-eslint/no-unused-vars`](../typescript/base.md#no-unused-vars)

Unused variables are a sign of refactoring artifact and should be removed as early as possible. However, there are the following exceptions:

```tsx
// Satisfying a type signature
const plugin: Plugin = (ast, options) => {
  // Only use options, but ast has to be declared
};

// Removing properties from objects
function Component(props: Props) {
  const { someProp, ...rest } = props;
  return <div {...rest} />;
}
```

If you have an unused error variable, omit the catch binding.

```ts
try {
  // ...
} catch {
  console.error("Failed");
}
```

This rule also flags classes with static initialization blocks. If your class's sole purpose is to run the initialization block, lift the block out of the class as normal code.

This rule also flags unused `using` variables. If you only intend for the resource to be disposed but not used, use a disable comment and wait for the [discard binding](https://github.com/tc39/proposal-discard-binding) proposal.

### [`no-use-before-define`](https://eslint.org/docs/rules/no-use-before-define)

- Severity: warning
- Configuration:
  - Allow export declarations before declarations (`allowNamedExports: false`)
  - Check class declarations (`classes: true`)
  - Check use-before-define enums (`enums: true`)
  - Allow function declarations to be hoisted (`functions: false`)
  - Allow referencing anything in type space (`ignoreTypeReferences: true`)
  - Allow all type declarations to be hoisted (`typedefs: false`)
  - Check variable declarations (`variables: true`)

You should generally avoid using variables before they are declared, as doing so leads to an error. For functions, you are free to let them get hoisted. In fact, we recommend the following style:

```ts
function doSomething() {
  doA();
  doB();
  doC();

  function doA() {}
  function doB() {}
  function doC() {}
}
```

This rule has known false negatives:

```ts
function foo() {
  console.log(x);
}

foo(); // Should not work
const x = 1;
```

Because types behave like functions, they are safe to be referenced everywhere. However, when enums are used as values, they are not hoisted. This is also checked by TypeScript.

### [`no-useless-assignment`](https://eslint.org/docs/rules/no-useless-assignment)

- Severity: error

Don't initialize a variable with a value that is immediately reassigned with something else.

### [`no-useless-rename`](https://eslint.org/docs/rules/no-useless-rename)

- Severity: error

Don't rename a variable to the same name in import, export, and destructuring.

### [`one-var`](https://eslint.org/docs/rules/one-var)

- Severity: off

Generally, you should put each variable declaration on its own line. However, when it makes sense (for example, multiple variables used for very similar purposes: `let start = 0, end = 0;`), you are free to declare multiple variables consecutively.

### [`prefer-const`](https://eslint.org/docs/rules/prefer-const)

- Severity: error
- Configuration:
  - Require `const` as long as any of the destructured variables should be `const` (`destructuring: "any"`)
  - Do not ignore variables that are only assigned once and read before assignment (`ignoreReadBeforeAssign: false`)

Only use `let` when the variable is actually reassigned. Otherwise, use `const`, which makes TypeScript infer narrower types, and makes the type of each variable easier to trace.

In destructuring, we require using `const` when any of the variables should be `const`. Otherwise, this may lead to spillover writability. If you want to make some of the variables `let`, you should destructure them separately.

```ts
const result = doSomething();
const { a, b } = result;
let { c, d } = result;
```

### [`prefer-destructuring`](https://eslint.org/docs/rules/prefer-destructuring)

- Severity: error
- Configuration:
  - Require destructuring for arrays (`array: true`)
  - Require destructuring for objects (`object: true`)
  - Do not require destructuring when the variable is renamed (`enforceForRenamedProperties: false`)

Destructuring is generally preferred over accessing properties directly. It makes the code more concise and easier to read. There are some catches:

1. When you are accessing a high array index (for example, `const char = str[5]`), you may not want to use destructuring like `const [, , , , , char] = str`. Disable the rule in this case.
2. In performance-critical cases, array destructuring is slower than property access. `const { 0: x } = a` may be faster than `const [x] = a`. This does not matter in general.
3. Not all index accesses can be safely refactored to array destructuring, unless the object is also iterable. You should use your own discretion when fixing the error.

### [`vars-on-top`](https://eslint.org/docs/rules/vars-on-top)

- Severity: error

We don't usually allow `var`s. When you do use them, put them at the top level of functions/scripts to minimize its quirks.

## Naming conventions

### [`camelcase`](https://eslint.org/docs/rules/camelcase)

- Severity: error
- Configuration:
  - Require destructured variables to be camelCase (`ignoreDestructuring: false`)
  - Require global variables to be camelCase (`ignoreGlobals: false`)
  - Require imported variables to be camelCase (`ignoreImports: false`)
  - Ignore property names in object literals (`properties: "never"`)

Until we fully use `@typescript-eslint/naming-convention`, we will still use this rule to enforce camelCase where possible. We don't check object properties because the object may be passed to a third-party library:

```ts
checkESLint({
  config: {
    camel_case: true,
  },
});
```

### [`id-denylist`](https://eslint.org/docs/rules/id-denylist)

- Severity: off

You may want to configure this yourself if you want to ban certain identifiers.

### [`id-length`](https://eslint.org/docs/rules/id-length)

- Severity: off

We don't think length is a good metric for name quality.

### [`id-match`](https://eslint.org/docs/rules/id-match)

- Severity: off

This rule is fully covered by `@typescript-eslint/naming-convention`.

### [`no-shadow-restricted-names`](https://eslint.org/docs/rules/no-shadow-restricted-names)

- Severity: error
- Configuration:
  - Do not allow `globalThis` (`reportGlobalThis: true`)

Don't declare a binding called `reportGlobalThis`, `undefined`, `NaN`, `Infinity`, `eval`, or `arguments`. You know exactly what values they represent.

### [`no-underscore-dangle`](https://eslint.org/docs/rules/no-underscore-dangle)

- Severity: off

You should generally avoid underscored names and prefer proper encapsulation instead (such as through closures and private names). Do _not_ use underscores to represent throwaway names; just leave it unused (such cases include object destructuring to throw the property away, or function parameters). However, there are cases where you have to use underscores, such as when the name is expected by an external API.

## Globals

### [`no-alert`](https://eslint.org/docs/rules/no-alert)

- Severity: error

There is no good reason to use `alert`/`confirm`/`prompt` in production. They are blocking and look too much like system dialogs.

### [`no-console`](https://eslint.org/docs/rules/no-console)

- Severity: can be enabled

`console.log` is commonly left as debugging artifacts and can occasionally disrupt the console log formatting. For example, Webpack has the unified [logger interface](https://webpack.js.org/api/logging/) for emitting messages. Projects are encouraged to encapsulate their own logger instance as well for unified message formatting and semantics.

However, in more casual projects without a wrapped logger, using `console.log` may be intentional. This rule can be overridden in user-land.

### [`no-eval`](https://eslint.org/docs/rules/no-eval)

- Severity: error
- Configuration:
  - Do not allow indirect `eval` (`allowIndirect: false`)

There is not much reason you should use `eval`—many safe alternatives exist. Indirect `eval` in strict mode tends to be safe but is still frowned upon. In case you really need to dynamically evaluate code, use `new Function` instead, which also allows injecting variables via parameters.

### [`no-global-assign`](https://eslint.org/docs/rules/no-global-assign)

- Severity: off

We have to turn this rule off, because we cannot make ESLint aware of every global, so the reports are too inconsistent and unhelpful. However, you should know from your heart to only reassign variables in your scope. If you want to modify globals, use `globalThis.x` instead to make your intention explicit.

### [`no-implied-eval`](https://eslint.org/docs/rules/no-implied-eval)

- Severity: error

There is no good reason to use `setTimeout`/`setInterval` with a string argument. Use a function instead.

### [`no-iterator`](https://eslint.org/docs/rules/no-iterator)

- Severity: error

Don't use the `__iterator__` property. No one implements it.

### [`no-new-func`](https://eslint.org/docs/rules/no-new-func)

- Severity: error

You should generally avoid using the `Function` constructor, because it is just another form of dynamic evaluation. However, compared to `eval`, it is easier to be used safely, and in case when you need to dynamically evaluate code, you should prefer to use this instead of `eval`.

### [`no-new-native-nonconstructor`](https://eslint.org/docs/rules/no-new-native-nonconstructor)

- Severity: error
- Related:
  - `ts(7009): 'new' expression, whose target lacks a construct signature, implicitly has an 'any' type.`

Don't construct `Symbol` and `BigInt` because they are not meant for construction.

### [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers)

- Severity: error

Don't construct `String`, `Number`, and `Boolean` objects because they are much harder to use and do not have any benefits over primitives.

### [`no-obj-calls`](https://eslint.org/docs/rules/no-obj-calls)

- Severity: error
- Related:
  - `ts(2349): This expression is not callable. Type 'Math' has no call signatures.`

Don't call `Math`, `JSON`, and other namespaces.

### [`no-object-constructor`](https://eslint.org/docs/rules/no-object-constructor)

- Severity: error

Don't use `new Object()` because it's just a longer way of writing `{}`. Always use `Object` with an argument.

### [`no-proto`](https://eslint.org/docs/rules/no-proto)

- Severity: error

Don't access the `__proto__` property. Use `Object.getPrototypeOf` and `Object.setPrototypeOf` instead. Note that the `__proto__` syntax in object literals is still allowed and should be preferred over `Object.create`.

```ts
// Write this:
const obj = {
  __proto__: null,
};

// Instead of this:
const obj = Object.create(null);
```

:::note

TypeScript does not support the `__proto__` syntax in object literals yet. However, `Object.create` will be always typed as `any`, so the former should still be preferred. Cast with `null as never` when necessary.

:::

### [`no-prototype-builtins`](https://eslint.org/docs/rules/no-prototype-builtins)

- Severity: error

Don't use `Object.prototype` methods because they are not safe against `null` and `undefined`. Generally, you don't need to jump hoops to get similar behavior.

```ts
// Instead of:
foo.hasOwnProperty("bar");
foo.propertyIsEnumerable("bar");
foo.isPrototypeOf(bar);

// Write:
Object.hasOwn(foo, "bar");
Object.getOwnPropertyDescriptor(foo, "bar")?.enumerable;
Object.prototype.isPrototypeOf.call(foo, bar); // Do you really need this?
```

### [`no-restricted-properties`](https://eslint.org/docs/rules/no-restricted-properties)

- Severity: off

You may want to configure this yourself if you want to ban certain identifiers or certain properties.

### [`no-undef`](https://eslint.org/docs/rules/no-undef)

- Severity: error
- Configuration:
  - Disallow using `typeof` on undefined variables (`typeof: true`)
- Related:
  - `ts(2304): Cannot find name 'a'.`

Don't use undefined variables. If you want to check if a variable is defined, use `if ("x" in globalThis)` or `if (typeof globalThis.x !== "undefined")`.

Note that this rule is only useful in a plain-JS project. In a TypeScript project, you should use TypeScript checks instead. You may find cases where ESLint is unaware of a global variable. In this case, either change your `env` setting, or use `globalThis.x`.

### [`no-undefined`](https://eslint.org/docs/rules/no-undefined)

- Severity: off

There's virtually no risk to use `undefined` nowadays, especially with rules like `no-shadow-restricted-names`. Furthermore, because `undefined` is so pervasive as the implicit "value of absence", it's hard to avoid it. You should generally use `undefined` instead of `null` as the default value, unless the latter has a semantic difference from `undefined`.

### [`prefer-object-has-own`](https://eslint.org/docs/rules/prefer-object-has-own)

- Severity: error

Use `Object.hasOwn` instead of `Object.prototype.hasOwnProperty.call`. It's shorter and more readable. If you need compatibility, install a polyfill. (You should never use `x.hasOwnProperty`, by the way; see [`no-prototype-builtins`](#no-prototype-builtins).)
