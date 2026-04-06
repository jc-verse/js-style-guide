---
sidebar_position: 9
---

# Async operations

This page discusses best practices for writing promises and async/await and managing async operations.

## Promises

### [`no-async-promise-executor`](https://eslint.org/docs/rules/no-async-promise-executor)

- Severity: error

From the ESLint docs:

> The executor function can also be an `async function`. However, this is usually a mistake, for a few reasons:
>
> - If an async executor function throws an error, the error will be lost and won't cause the newly-constructed `Promise` to reject. This could make it difficult to debug and handle some errors.
> - If a Promise executor function is using `await`, this is usually a sign that it is not actually necessary to use the `new Promise` constructor, or the scope of the `new Promise` constructor can be reduced.

### [`no-promise-executor-return`](https://eslint.org/docs/rules/no-promise-executor-return)

- Severity: error
- Configuration:
  - Do not allow returning a `void` expression (`allowVoid: false`)

The executor's return value is ignored and you may be confusing it with the `resolve` function. Do not use concise arrow functions with promise executors, because it usually does not make the code much shorter.

### [`prefer-promise-reject-errors`](https://eslint.org/docs/rules/prefer-promise-reject-errors)

- Severity: error
- Configuration:
  - Do not allow rejecting with nothing (`allowEmptyReject: false`)

Just like you should always `throw` an `Error` instance, you should always `reject` with an `Error` instance. This means when people use `try...catch` with `await`, they can catch the error and handle it properly.

## Async functions

### [`require-await`](https://eslint.org/docs/rules/require-await)

- Severity: warning

You should not define an `async` function that does not `await` anything. This means the users have to unnecessarily `await` to get the return value.

This is only a warning, because there are many cases where the lack of `await` is intentional:

- The function is a stub and will be implemented later.
- It's a callback function and the caller will `await` it. You want to remind readers that `await` is allowed in this function.
- The caller explicitly _requires_ a `Promise` instance to be returned.
- The function calls another function that is planned to become async in the future.
- The function is a method that derives from an async base method.

You can use your discretion to disable this rule in these cases.

## Generator functions

### [`require-yield`](https://eslint.org/docs/rules/require-yield)

- Severity: warning

For the same reasons as `require-await`, this is only set to a warning because there are cases where a generator function is semantically more appropriate.

## Paralleling

### [`no-await-in-loop`](https://eslint.org/docs/rules/no-await-in-loop)

- Severity: off

While this rule enforces a practice that we are in favor of—prefer paralleling promises instead of firing sequentially, the number of false-positives is overwhelming. Sometimes async operations' order does matter, for example, if we care about the priority of each operation, or when each operation modifies the global state.

```ts twoslash
// @filename: deps.d.ts
declare module "fs-extra" {
  export function pathExists(path: string): Promise<boolean>;
}

// @filename: index.ts
// ---cut---
import fs from "fs-extra";

/**
 * When multiple files match, we return the one with priority of JSON > YAML > TOML
 */
async function findDataFile() {
  const fileNames = ["data.json", "data.yml", "data.toml"];
  for (const fileName of fileNames) {
    if (await fs.pathExists(fileName)) {
      return fileName;
    }
  }
  return null;
}
```

The corresponding "nice" way to do this is too obscure and far above being understandable by average-intelligents, and extracting it as a utility function is almost never worthwhile.

```ts twoslash
function executeAsyncSequential<T>(arr: T[], action: (a: T) => Promise<void>) {
  return arr.reduce(
    (res, elem) => res.then(() => action(elem)),
    Promise.resolve(),
  );
}

function findAsyncSequential<T>(arr: T[], matcher: (a: T) => Promise<boolean>) {
  const notFound = Symbol("not found");
  return arr
    .reduce<Promise<T | typeof notFound>>(async (res, elem) => {
      if ((await res) !== notFound) return res;
      if (await matcher(elem)) return await elem;
      return notFound;
    }, Promise.resolve(notFound))
    .then((res) => (res === notFound ? undefined : res));
}
```

## Racing

### [`require-atomic-updates`](https://eslint.org/docs/rules/require-atomic-updates)

- Severity: warning
- Configuration:
  - Do not special-case property assignment because the async operation may modify any property (`allowProperties: false`)

You should generally avoid side effects. When side effects are unavoidable, make sure that only one function is able to update the variable. This rule is helpful, but there can be false-positives, because it can only enforce defensive coding but not locate any actual offenders.
