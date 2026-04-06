---
sidebar_position: 7
---

# Objects & classes

This page introduces rules related to declaring objects and classes. It does not discuss about _using_ them.

## General

### [`max-classes-per-file`](https://eslint.org/docs/rules/max-classes-per-file)

- Severity: off

Unlike languages like Java where one-class-per-file is mandated, classes in JS are a very granular unit of data and doesn't represent the entire module. Constraining the number of classes doesn't make sense in JS.

### [`no-class-assign`](https://eslint.org/docs/rules/no-class-assign)

- Severity: error
- Related:
  - `ts(2629): Cannot assign to 'A' because it is a class.`

Under no circumstance should you be reassigning a binding introduced by a declaration—this makes the variable's type hard to reason about. Class declarations are already immutable inside the declaration, so it should be immutable outside too. One niche case where reassignment is intended is for "decorators":

```ts
class Foo {}

Foo = decorate(Foo);
```

But you should use actual decorators instead.

### [`object-shorthand`](https://eslint.org/docs/rules/object-shorthand)

- Severity: error
- Configuration:
  - Require all shorthands (`"always"`)
  - Avoid arrow functions that use explicit `return` (`avoidExplicitReturnArrows: true`)
  - Use shorthand even when the property requires quotes (`avoidQuotes: false`)
  - Do not ignore "constructors" (`ignoreConstructors: false`)

Use object shorthands (`{ a }` instead of `{ a: a }`) whenever possible. Also use methods instead of `function` expressions. You should also use methods instead of arrow functions, unless the latter results in shorter code (see also `func-style`), i.e. when you can use concise arrow body.

If for some reason you need to declare a constructor in an object literal:

```ts
const obj = {
  SomeClass: function () {},
};
```

Consider either using a class declaration or a class expression instead.

### [`prefer-object-spread`](https://eslint.org/docs/rules/prefer-object-spread)

- Severity: error

Use object spread (`{ ...a }`) instead of `Object.assign({}, ...)`.

## Constructors

### [`constructor-super`](https://eslint.org/docs/rules/constructor-super)

- Severity: error
- Related:
  - `ts(2335): 'super' can only be referenced in a derived class.`
  - `ts(2377): Constructors for derived classes must contain a 'super' call.`
  - `ts(17009): 'super' must be called before accessing 'this' in the constructor of a derived class.`

It's a runtime error if an extended class doesn't call `super()` or if a base class calls `super()`.

```ts twoslash
// @errors: 2335 2377 17009 2339
class Base {
  constructor() {
    super(); // -> SyntaxError: 'super' keyword unexpected here
  }
}

class Extended extends Base {
  b: number;

  constructor() {
    this.b = 2; // -> ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
  }
}
```

Note that the error can also be prevented by returning an object from the constructor.

### [`no-constructor-return`](https://eslint.org/docs/rules/no-constructor-return)

- Severity: error

Constructors' return values are useless. You can't call it as a normal method, after all.

```ts
class A {
  constructor() {
    return "foo";
  }
}

const a = new A().constructor(); // -> TypeError: Class constructor A cannot be invoked without 'new'
```

If you return an object from the constructor, it will replace the `this` value and become the result of the `new` expression. This is very rarely what you want, because it usually breaks the semantics that `new A instanceof A`. In the case where this is intended, use a disable comment.

```ts
class A {
  constructor() {
    return {};
  }
}

const a = new A();
console.log(a instanceof A); // -> false
```

### [`no-this-before-super`](https://eslint.org/docs/rules/no-this-before-super)

- Severity: error
- Related:
  - `ts(17009): 'super' must be called before accessing 'this' in the constructor of a derived class.`

You cannot access `this` before calling `super()` in a constructor. This results in a runtime error. There are some edge cases, such as when the `super()` call is contained in a closure. Consider whether you actually need to do this.

```ts twoslash
// @errors: 2377 2337 17009

const wrappedCall = (fn: () => void) => fn();

class A extends Object {
  constructor() {
    wrappedCall(() => {
      super();
    });
    console.log(this);
  }
}

new A(); // Works in JS, but linters are unhappy
```

### [`no-useless-constructor`](https://eslint.org/docs/rules/no-useless-constructor)

- Severity: error

Do not write constructors that are empty or only call `super()`. Such constructors can be omitted. Even in TypeScript, we prefer to not change the constructor's visibility, or use parameter properties, so generally there shouldn't be many false positives.

## Members

### [`no-dupe-class-members`](https://eslint.org/docs/rules/no-dupe-class-members)

- Severity: error
- Related:
  - `ts(2300): Duplicate identifier 'a'.`
  - `ts(2393): Duplicate function implementation.`

Duplicate class members overwrite each other and is likely a mistake. Overloads are irrelevant to this rule.

### [`no-dupe-keys`](https://eslint.org/docs/rules/no-dupe-keys)

- Severity: error
- Related:
  - `ts(1117): An object literal cannot have multiple properties with the same name.`

Duplicate keys in object literals overwrite each other and is likely a mistake. If you have some side effects that are hard to manage, consider evaluating all the side effects before creating the object literal.

```js
const obj = {
  a: doSomething(),
  b: doSomethingElse(),
  a: doAnotherThing(),
};
```

```ts
doSomething();
const b = doSomethingElse();
const a = doAnotherThing();

const obj = { a, b };
```

### [`no-unused-private-class-members`](https://eslint.org/docs/rules/no-unused-private-class-members)

- Severity: error
- Related:
  - `ts(6133): '#a' is declared but its value is never read.`

Unused private members are like unused local variables. They cannot be accessed from anywhere else.

### [`no-useless-computed-key`](https://eslint.org/docs/rules/no-useless-computed-key)

- Severity: error
- Configuration:
  - Check class members too (`enforceForClassMembers: true`)

Don't use computed keys when the expression is a literal. An exception (also special cased by the rule) is when the key is `__proto__`, because `{ __proto__: x }` is not the same as `{ ["__proto__"]: x }`.

## Methods

### [`class-methods-use-this`](https://eslint.org/docs/rules/class-methods-use-this)

- Severity: off

Unlike other languages like Java where every instance contains the static methods, static methods only exist on the class itself in JavaScript. This means it should rather be up to the developer to decide whether it should be a static or instance method, since there can be semantic differences.

Often, a method that doesn't use `this` is used as a base implementation that requires overriding. Or, it's interacting with an external runtime system. (For example, `React.Component`'s `render()` method.) This rule is turned off both because of the number of false-positives (where instance methods are necessary) and because of the semantic differences.

## Accessors

### [`accessor-pairs`](https://eslint.org/docs/rules/accessor-pairs)

- Severity: error
- Configuration:
  - Check class members in addition to object definitions (`enforceForClassMembers: true`)
  - Report getters without setters (`getWithoutSet: true`)
  - Report setters without getters (`setWithoutGet: true`)
- Related:
  - `ts(2540): Cannot assign to 'X' because it is a read-only property.`

Accessors must be symmetrical. In non-strict mode, a getter without setter doesn't forbid setting the variable, but the re-assignment is silently ignored. In strict mode, it throws an error whose message cannot be customized.

```ts twoslash
// @errors: 2540
class Foo {
  get bar() {
    return 1;
  }
}

const foo = new Foo();
foo.bar = 2; // -> In non-strict mode, it succeeds without any warning!
console.log(foo.bar); // -> 1
```

To create read-only members, define a setter that throws an error.

```ts twoslash
class Foo {
  get bar() {
    return 1;
  }

  set bar(value: number) {
    throw new Error("'bar' is readonly");
  }
}

const foo = new Foo();
foo.bar = 2; // -> Throws error
```

TypeScript will also report attempts to assign to a read-only member that doesn't have a setter, so in a TypeScript project, you may want to override `getWithoutSet` to `false`.

A setter without getter violates the basic expectations of member-accessing. More importantly, TypeScript will not warn about such case, and the property access returns `undefined`.

```ts twoslash
class Foo {
  #privateBar = 1;

  set bar(val: number) {
    this.#privateBar = val;
  }
}

const foo = new Foo();
foo.bar = 2;
console.log(foo.bar); // -> undefined
```

If a setter's sole purpose is to induce side-effects on internal state, use a method instead.

```ts twoslash
class Foo {
  #privateBar = 1;

  setBar(val: number) {
    this.#privateBar = val;
  }
}

const foo = new Foo();
foo.setBar(2);
```

### [`getter-return`](https://eslint.org/docs/rules/getter-return)

- Severity: error
- Configuration:
  - Do not allow implicitly returning `undefined` (`allowImplicit: false`)
- Related:
  - `ts(2378): A 'get' accessor must return a value.`

A getter must explicitly return a value. Otherwise, TypeScript will give a weird type of `void`.

```ts twoslash
class Foo {
  get bar() {
    return;
  }
}

const foo = new Foo();
console.log(foo.bar); // Type is "void"?
```

### [`grouped-accessor-pairs`](https://eslint.org/docs/rules/grouped-accessor-pairs)

- Severity: off

We do not enforce that accessors appear in pairs, because it's also common to have all getters in one place and setters in another. Since we mandate symmetric getters and setters, we aren't worried about the absence of the other.

```ts
class Foo {
  #a: number;
  #b: number;

  // Getters
  get a() {
    return this.#a;
  }
  get b() {
    return this.#a;
  }

  // Setters
  set a(val: number) {
    this.#a = val;
  }
  set b(val: number) {
    this.#b = val;
  }
}
```

### [`no-setter-return`](https://eslint.org/docs/rules/no-setter-return)

- Severity: error
- Related:
  - `ts(2408): Setters cannot return a value.`

The return values of setters are ignored and are likely a mistake.

## Other class elements

### [`no-empty-static-block`](https://eslint.org/docs/rules/no-empty-static-block)

- Severity: error

Empty static blocks are useless and are a sign of refactoring artifacts.

## Inheritance

### [`no-extend-native`](https://eslint.org/docs/rules/no-extend-native)

- Severity: error

Do not monkeypatch native prototypes. There are too many examples of this causing problems. If you want to polyfill, use a library. Otherwise, use a utility function.

You should generally avoid modifying the prototype of any object, including your own classes. If you want to add a method to a class, use inheritance.

### Subclassing built-ins

In short: don't. I'd love it if we are able to, but we live in a world where TC39 is actively messing up our experience, so to prevent more pain, use composition instead. Read [subclassing built-ins](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends#subclassing_built-ins) (written by me) for more information.
