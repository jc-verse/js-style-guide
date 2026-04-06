---
sidebar_position: 10
---

# Modules

This page introduces rules related to modules, such as import/exports.

## Module names

## Imports

### [`no-import-assign`](https://eslint.org/docs/rules/no-import-assign)

- Severity: error
- Related:
  - `ts(2632): Cannot assign to 'x' because it is an import.`

Do not assign to imports. This is an error because imported bindings are readonly.

### [`no-restricted-imports`](https://eslint.org/docs/rules/no-restricted-imports)

- Severity: can be enabled

You may want to configure this yourself if you want to ban certain identifiers or certain modules. A typical use case is to restrict the use of `lodash` in favor of native operations.

## Exports

### [`no-restricted-exports`](https://eslint.org/docs/rules/no-restricted-exports)

- Severity: can be enabled

You may want to configure this yourself if you want to ban certain identifiers.

### Use of `export *`

We ban the use of wildcard exports. This is because

## Strict mode

### [`strict`](https://eslint.org/docs/rules/strict)

- Severity: error
- Configuration:
  - Require strict mode (`"global"`)

All files should be in strict mode. They should probably also be modules.
