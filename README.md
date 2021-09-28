# ApiDOM

The purpose of ApiDOM is to provide a single, unifying structure for describing APIs across
API description language and serialization formats. There currently exists several API description languages one can choose
when defining an API, from OpenAPI, RAML or API Blueprint.
There are also many serialization formats such as XML, YAML or JSON. Without a way to parse these formats
to the same structure, developers are required to handle each format one-by-one, each in a different
way and each translating to their internal domain model. This is tedious, time-consuming,
and requires each maintainer to stay in step with every format they support.

ApiDOM solves this complex problem in a simple way. It allows parsers to parse to a single structure
and allows tool builders to consume one structure for all formats.

If there is one thing API description languages have taught us, it is that a single contract provides
the best and fastest way to design and iterate on an API. Developers building the API can move independently
as they progress towards the defined contract found in the OpenAPI or RAML document.
Conversely, API consumers can build tools for consuming the API based on the API definition document.

This same pattern has proven to be just as valuable for building API description languages and tooling.
ApiDOM is the contract for producing and consuming the many API description languages and serialization formats
and allows everyone to move quickly and independently.

### What is an Element ?

ApiDOM is made up of many small elements that have a rich semantic meaning given their value and context.
An element is an individual piece that makes up an API, and can range from defining a resource to providing
an example of an HTTP request.

The ApiDOM defines elements to be used for:

Describing an API
Describing data structures used within that API
Describing parse results when parsing API-related documents
These elements also seek to provide a way to decouple APIs and their semantics from the implementation details.

The structure of an ApiDOM is recursive by nature. When looking for specific elements,
it is best to traverse the ApiDOM tree to look for a match. Querying the ApiDOM tree will
decouple our code from specific API description language. Also, it decouples our code from the
specific structure of these documents as long as they are semantically equivalent.

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

You may have noticed the similarities between the JSON example above and XML.
XML has elements, attributes, and content. It would be a good question to ask if we simply turned JSON into XML.

ApiDOM is actually meant to provide these cross-format similarities. It means that a JSON structure
may be refracted and converted to XML. It also means an XML document may be converted into ApiDOM.
This also goes for YAML, HTML, CSV, and many other formats. ApiDOM is a way to use refracting to unify these structures.

Let's look at another example, this time refacting XML with ApiDOM.

```xml
<person name="John Doe" email="john@example.com">
```

This example in refracted form would look like the following snippet. Notice that we're using attributes in resulting ApiDOM structure.

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

Since we can go back and forth between JSON, YAML, XML, and other formats, we are now able to use same toolset across the different formats.
That means we could use XSLT to transform JSON documents.

### As a queryable structure

ApiDOM is meant to free us from the structure of our documents, similar to how XML does with things
like XPATH or the DOM. It means we can now query JSON documents as if there was an underlying DOM,
which decouples our SDK from our structure and our structure from our data.



## Technical info

This is a monorepo for all ApiDOM packages. All the code is written in [TypeScript](https://www.typescriptlang.org/).
To see all these monorepo packages working in browser check out our [ApiDOM Playground](https://reimagined-dollop-c7e3930f.pages.github.io/).


## Prerequisites

We're using [node-gyp](https://www.npmjs.com/package/node-gyp) to build some fragments that require [Python 3.x](https://www.python.org/downloads/).
[emscripten](https://emscripten.org/docs/getting_started/downloads.html) or [docker](https://www.docker.com/) need to be installed
on your operating system. We strongly recommend going with a docker option.

```json
"engines": {
  "node": "~16.8",
  "npm": ">=7.21.0"
}
```

## Monorepo management

All the information necessary for working with monorepo can be found in this [article](https://vladimirgorej.com/blog/things-i-have-learned-maintaining-javascript-monorepo-with-lerna/).

## Installation

This repository is using [scopes GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry) for installation and publishing.
In order to use GitHub Packages you have be authenticated with a personal access token.
Please read following document to [Authenticate with a personal access token](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token) against GitHub Packages.

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

Some texts in this document were taken from [Refract specification](https://github.com/refractproject/refract-spec)
and [Api Elements](https://apielements.org/).
Here are links to files:

- [LICENSE](https://github.com/refractproject/refract-spec/blob/master/LICENSE)
- [LICENSE](https://github.com/apiaryio/api-elements/blob/master/LICENSE)
