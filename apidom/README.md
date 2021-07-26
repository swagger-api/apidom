# ApiDOM

ApiDOM is a recursive data structure for expressing complex structures, relationships, and metadata.
It handles all sorts and kinds of data across all sorts and kinds of formats.
That's a very general-purpose description for a general-purpose structure.
To get an idea of what ApiDOM does, we'll walk through some of its uses with some examples along the way.

### As a way to annotate JSON

ApiDOM provides the ability to take a normal JSON structure and add a layer on top of it for the purpose
of annotating and adding semantic data. Instead of creating an entirely different structure to describe the data,
ApiDOM's approach is to expand the existing structure (we call it "refracting" a structure).
Here is an example to show our point.

Take the following simple JSON object.

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

Using ApiDOM, we can expand this out and add some human-readable titles and descriptions.

```json
{
  "element": "object",
  "content": [
    {
      "element": "member",
      "meta": {
        "title": "Name",
        "description": "Name of a person"
      },
      "content": {
        "key": {
          "element": "string",
          "content": "name"
        },
        "value": {
          "element": "string",
          "content": "John Doe"
        }
      }
    },
    {
      "element": "member",
      "meta": {
        "title": "Email",
        "description": "Email address for the person"
      },
      "content": {
        "key": {
          "element": "string",
          "content": "email"
        },
        "value": {
          "element": "string",
          "content": "john@example.com"
        }
      }
    }
  ]
}
```

We added some semantic data to the existing data, but we did so while retaining the semantic structure of the data
with the object and string elements. **This means there is no semantic difference in the ApiDOM structure and
the original JSON structure**. It also means we can add extra semantics on top of these structural ones.

### As a unifying structure

If you have a keen eye, you may have noticed the similarities between the JSON example above and XML.
XML has elements, attributes, and content. If you caught this and wanted to ask if we simply turned JSON into XML,
you'd be asking a fair question.

ApiDOM is actually meant to provide these cross-format similarities. It means that a JSON structure
may be refracted and converted to XML. It also means an XML document may be converted into ApiDOM.
This also goes for YAML, HTML, CSV, and many other formats. ApiDOM is a way to unify these structures.

Since we said we'd include examples, let's look at moving XML over into Refract.

```xml
<person name="John Doe" email="john@example.com">
```

This example in refracted form would look like this. Notice that we're using attributes
instead of meta because attributes are free to be used.

```json
{
  "element": "person",
  "attributes": {
    "name": {
      "element": "string",
      "content": "John Doe"
    },
    "email": {
      "element": "string",
      "content": "john@example.com"
    }
  }
}
```

Because we can go back and forth between JSON, YAML, XML, and other formats, we are now free to use toolsets across formats.
That means we could use XSLT to transform JSON documents.

### As a queryable structure

ApiDOM is meant to free you from the structure of your documents, similar to how XML does with things
like XPATH or the DOM. It means we can now query JSON documents as if there was an underlying DOM,
which decouples our SDK from our structure and our structure from our data.



## Technical info

This is a monorepo for all ApiDOM packages. All the code is written in [TypeScript](https://www.typescriptlang.org/).
To see all these monorepo packages working in browser check out our [ApiDOM Playground](https://reimagined-dollop-c7e3930f.pages.github.io/).


## Prerequisites

We're using [node-gyp](https://www.npmjs.com/package/node-gyp) to build some fragments that require [Python 3.x](https://www.python.org/downloads/).

```json
"engines": {
  "node": "~14",
  "npm": ">=6.14.5 <7"
}
```

## Monorepo management

All the information necessary for working with monorepo can be found in this [article](https://www.linkedin.com/pulse/things-i-wish-had-known-when-started-javascript-monorepo-gorej/).

[emscripten](https://emscripten.org/docs/getting_started/downloads.html) or [docker](https://www.docker.com/) need to be installed
on your operating system. We strongly recommend to go with a docker option.

## Installation

```sh
 $ npm i
 $ npm run build
```

> Note: monorepo needs to be build in order for monorepo package topology for work correctly.

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
All the build artifacts are polymorphic - they can run in different environments like [Web Browser](https://en.wikipedia.org/wiki/Web_browser), [Node.js](https://nodejs.org/) or [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).

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

## License analysis

This license analysis was done on 12th of March 2021.

```
Dependencies distributed directly to the user:
- stampit - MIT, $, #
- minim - MIT, $, <1>
- ramda - MIT, $, #
- ramda-adjunct, BSD 3-Clause License, $, #
- unraw - MIT, $, #
- @babel/runtime-corejs3 - MIT, $, <2>
- tree-sitter - MIT, $, <1>
- tree-sitter-json - MIT, $, <1>
- tree-sitter-yaml - MIT, $, <1>
- web-tree-sitter - MIT, #
- axios - MIT, $, <1>
Transitive depedencies directly distributed to the user:
 lodash - MIT, CC0, #, required by minim
 core-js-pure - MIT, $, #, required by @babel/runtime-corejs3
 regenerator-runtime - MIT, $, #, required by @babel/runtime-corejs3
 nan - MIT, $, #, required by tree-sitter-* packages
 follow-redirects - MIT, $, #, required by axios
Legend
 - $: license present in distribution package
 - #: has no depedencies
 - <number>: number of transitive dependencies
We have one case of copying the code directly from GitHub repository: https://github.com/graphql/graphql-js
This code is concentrated in singe file in our codebase, is properly
attributed and contains original license text as well.
```

Some texts in this document were taken from [Refract specification](https://github.com/refractproject/refract-spec).
Here is a link to the [LICENSE](https://github.com/refractproject/refract-spec/blob/master/LICENSE) file.
