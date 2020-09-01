# ApiDOM

We assume that your `CWD` is now ApiDOM GitHub repository.
Change directory to `./apidom` monorepo to run all the following commands.

## Prerequisites

```json
  "engines": {
    "node": ">=10.21.0",
    "npm": ">=6.14.5"
  },
```

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
