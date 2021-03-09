# ApiDOM

This is a monorepo for all ApiDOM packages. All the code is written in [TypeScript](https://www.typescriptlang.org/).

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

## Clean

```sh
 $ npm run clean
```

## Build artifacts

All the packages have identical build system and expose build artifacts in identical way.
After [building artifacts](#building-artifacts) every package will contain five (5) additional directories.

**cjs/**

This directory mirrors the structure of the codebase in `src/`.
Contains ES5 compatible code with [CommonJS](https://en.wikipedia.org/wiki/CommonJS) style imports.
Build fragments in this directory are ideal for [Node.js](https://nodejs.org/) and similar environments.

**es/**

This directory mirrors the structure of the codebase in `src/`.
Contains ES5 compatible code with [ES6 imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).
Build fragments in this directory are ideal for bundling with [Webpack](https://webpack.js.org/) or similar bundlers.

**dist/**

This directory contains bundled build fragments that use [UMD](https://github.com/umdjs/umd) modules.
They're ideal for browser usage. The fragments are both in minified and un-minified form.

**types/**

TypeScript types generated from the source code.

## Package mapping

Every package maps it's [build artifacts](#build-artifacts) in `package.json` file in following way:

```json
"main": "cjs/index.js",
"module": "es/index.js",
"jsnext:main": "es/index.js",
"unpkg": "dist/apidom.browser.min.js",
"types": "types/index.d.ts",
```

To learn more about these fields please refer to [webpack mainFields documentation](https://webpack.js.org/configuration/resolve/#resolvemainfields).

Some packages produce build artifacts that are not [isomorphic](https://en.wikipedia.org/wiki/Isomorphic_JavaScript)
and instead code is written specifically for the client or the server. In that case `package.json` mapping looks like this:

```json
"main": "cjs/adapter-node.js",
"module": "es/adapter-browser.js",
"jsnext:main": "es/adapter-browser.js",
"browser": "es/adapter-browser.js",
"unpkg": "dist/apidom-parser-apdater-json.browser.min.js",
"types": "types/adapter-browser.d.ts",
```
