# ApiDOM

This is a monorepo for all ApiDOM packages.

## Prerequisites

```json
"engines": {
  "node": ">=10.21.0",
  "npm": ">=6.14.5"
}
```

## Monorepo management

All the information necessary for working with monorepo can be found in this [article](https://www.linkedin.com/pulse/things-i-wish-had-known-when-started-javascript-monorepo-gorej/).

[emscripten](https://emscripten.org/docs/getting_started/downloads.html) or [docker](https://www.docker.com/) need to be installed
on your operating system. We strongly recommend to go with a docker option.

## Installation

```sh
 $ npm i
```

## Building artifacts

```sh
 $ npm run build
```

## Tests

You must first **build the artifacts** before running tests.

```sh
 $ npm run test
```

## Linting

```sh
 $ npm run lint
```

## TypeScript types checking


```sh
 $ npm run typescript:check-types
```

## TypeScript types generation

```sh
 $ npm run typescript:declaration
```

## Security audit

```sh
 $ npm run security-audit
```

