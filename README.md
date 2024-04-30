[comment]: <> (SPDX-FileCopyrightText: Copyright &#40;c&#41; 2015 refractproject)
[comment]: <> (SPDX-License-Identifier: MIT)

[comment]: <> (SPDX-FileCopyrightText: Copyright &#40;c&#41; 2015 Apiary Inc.)
[comment]: <> (SPDX-License-Identifier: MIT)

# ApiDOM

[![Build Status](https://github.com/swagger-api/apidom/actions/workflows/build.yml/badge.svg)](https://github.com/swagger-api/apidom/actions)
[![Dependabot enabled](https://badgen.net/badge/icon/dependabot?icon=dependabot&label)](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically)


The purpose of ApiDOM is to provide a single, unifying structure for describing APIs across
API description language and serialization formats. There currently exists several API description languages one can choose
when defining an API, from OpenAPI, RAML, API Blueprint or others.
There are also many serialization formats such as XML, YAML or JSON. Without a way to parse these formats
to the same structure, developers are required to handle each format one-by-one, each in a different
way and each translating to their internal domain model. This is tedious, time-consuming,
and requires each maintainer to stay in step with every format they support.

ApiDOM solves this complex problem in a simple way. It allows parsers to parse to a single structure
and allows tool builders to consume one structure for all formats.

## Table of Contents

- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [ApiDOM Playground](#apidom-playground)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Setting up](#setting-up)
  - [Setting up via docker](#setting-up-via-docker)
  - [Setting up via GitHub Codespaces](#setting-up-via-github-codespaces)
  - [npm scripts](#npm-scripts)
  - [Build artifacts](#build-artifacts)
  - [Using this monorepo as a local dev dependency](#using-this-monorepo-as-a-local-dev-dependency)
- [Contributing](#contributing)
- [Documentation](#documentation)
  - [What is an Element ?](#what-is-an-element-)
  - [As a way to annotate JSON](#as-a-way-to-annotate-json)
  - [As a unifying structure](#as-a-unifying-structure)
  - [As a queryable structure](#as-a-queryable-structure)
  - [ApiDOM stages](#apidom-stages)
- [License](#license)
- [Software Bill Of Materials (SBOM)](#software-bill-of-materials-sbom)

## Getting started

### Prerequisites

These prerequisites are required both for installing ApiDOM as a npm package and local development setup.

- [node-gyp](https://www.npmjs.com/package/node-gyp) with [Python 3.x](https://www.python.org/downloads/)
- [GLIBC](https://www.gnu.org/software/libc/) `>=2.29`
- [GCC compiler](https://gcc.gnu.org/)
- [emscripten](https://emscripten.org/docs/getting_started/downloads.html) or [docker](https://www.docker.com/) needs to be installed, we recommend going with a docker option

### Installation

Assuming [prerequisites](#prerequisites) are already installed, ApiDOM npm packages are installable and works with `Node.js >=12.22.0 <=20`.

You can install ApiDOM packages using [npm CLI](https://docs.npmjs.com/cli):

```sh
 $ npm install @swagger-api/apidom-ast
 $ npm install @swagger-api/apidom-converter
 $ npm install @swagger-api/apidom-core
 $ npm install @swagger-api/apidom-error
 $ npm install @swagger-api/apidom-json-path
 $ npm install @swagger-api/apidom-json-pointer
 $ npm install @swagger-api/apidom-json-pointer-relative
 $ npm install @swagger-api/apidom-logging
 $ npm install @swagger-api/apidom-ls
 $ npm install @swagger-api/apidom-ns-api-design-systems
 $ npm install @swagger-api/apidom-ns-asyncapi-2
 $ npm install @swagger-api/apidom-ns-json-schema-draft-4
 $ npm install @swagger-api/apidom-ns-json-schema-draft-6
 $ npm install @swagger-api/apidom-ns-json-schema-draft-7
 $ npm install @swagger-api/apidom-ns-openapi-2
 $ npm install @swagger-api/apidom-ns-openapi-3-0
 $ npm install @swagger-api/apidom-ns-openapi-3-1
 $ npm install @swagger-api/apidom-ns-workflows-1
 $ npm install @swagger-api/apidom-parser
 $ npm install @swagger-api/apidom-parser-adapter-api-design-systems-json
 $ npm install @swagger-api/apidom-parser-adapter-api-design-systems-yaml
 $ npm install @swagger-api/apidom-parser-adapter-asyncapi-json-2
 $ npm install @swagger-api/apidom-parser-adapter-asyncapi-yaml-2
 $ npm install @swagger-api/apidom-parser-adapter-json
 $ npm install @swagger-api/apidom-parser-adapter-openapi-json-2
 $ npm install @swagger-api/apidom-parser-adapter-openapi-json-3-0
 $ npm install @swagger-api/apidom-parser-adapter-openapi-json-3-1
 $ npm install @swagger-api/apidom-parser-adapter-openapi-yaml-2
 $ npm install @swagger-api/apidom-parser-adapter-openapi-yaml-3-0
 $ npm install @swagger-api/apidom-parser-adapter-openapi-yaml-3-1
 $ npm install @swagger-api/apidom-parser-adapter-workflows-json-1
 $ npm install @swagger-api/apidom-parser-adapter-workflows-yaml-1
 $ npm install @swagger-api/apidom-parser-adapter-yaml-1-2
 $ npm install @swagger-api/apidom-reference
```

### Usage

Every package of the monorepo has an associated README file demonstrating its purpose and containing
usage examples.

### ApiDOM Playground

ApiDOM Playground is a React application that runs in a browser and can visually demonstrate capabilities
of the ApiDOM. ApiDOM Playground is build and deployed whenever the new commit lands on `main` branch.

![image](https://user-images.githubusercontent.com/193286/145010522-5d85e34b-8d28-4a07-9ee2-b28807a013cd.png)

ApiDOM Playground is available at [https://swagger-api.github.io/apidom/](https://swagger-api.github.io/apidom/)

## Development

This is a monorepo for all ApiDOM packages. All the code is written in [TypeScript](https://www.typescriptlang.org/).
All the information necessary for working with monorepo can be found in this [article](https://vladimirgorej.com/blog/things-i-have-learned-maintaining-javascript-monorepo-with-lerna/).

Assuming [prerequisites](#prerequisites) are already installed, [Node.js](https://nodejs.org/) `>=20.3.0` and `npm >=9.6.7`
are the minimum required versions that this repo runs on, but we recommend using the latest version of Node.js@20.

### Setting up

Run the following commands to setup the repository for local development:

```shell
 $ git clone https://github.com/swagger-api/apidom.git
 $ cd apidom
 $ npm i
 $ npm run build
```

### Setting up via docker

There are situations, when satisfying all the **prerequisites** of this repository on you local
development machine is just not possible. In that case, you can use **docker** to get around it.
Repository directory is mounted as volume inside a running container called `apidom-dev`.
That way you can edit code locally on your development machine and run **npm scripts**
inside the `apidom-dev` docker container.

**Build the ApiDOM docker image:**

```sh
 $ git clone https://github.com/swagger-api/apidom.git
 $ cd apidom
 $ docker-compose up
```

**Install dependencies and build ApiDOM inside the docker container:**

```sh
$ docker exec -it apidom-dev npm i --verbose
$ docker exec -it apidom-dev npm run build
```

**Run npm scripts inside the docker container:**

```sh
$ docker exec -it apidom-dev npm run test
```

> Note: monorepo needs to be build in order for monorepo package topology to work correctly.

### Setting up via GitHub Codespaces

This repository is [configured](https://github.com/swagger-api/apidom/tree/main/.devcontainer) to work with [GitHub Codespaces](https://github.com/codespaces).
Create a new codespace by picking this repository from the list of available repositories.
Once the codespace is created, run following commands inside the codespace terminal:

```sh
 $ npm i
 $ npm run build
```

### npm scripts

Some npm scripts run in parallel. Default maximum parallelization is set `2`. This is due to the fact
that our `CI` runs on GitHub Actions which uses GitHub hosted runners with [2-core CPUs](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources).
If you have computer with more than 2 CPU cores, you can speed running npm scripts by
creating an environment variable called `CPU_CORES` and assign it a number of your CPU cores.

Assuming 4 CPU cores are available:

```sh
  $ export CPU_CORES=4
  $ npm run build
```

`build` scripts now runs much faster than before.

**Build artifacts**

```sh
 $ npm run build
```

**Test**

You must first **build the artifacts** before running tests.

```sh
 $ npm run test
```

**Lint**

```sh
 $ npm run lint
```

**Check TypeScript types**

```sh
 $ npm run typescript:check-types
```

**Generate TypeScript types**

```sh
 $ npm run typescript:declaration
```

**Clean**

```sh
 $ npm run clean
```

### Build artifacts

All the packages have identical build system and expose build artifacts in identical way.
After building artifacts, every package will contain five (5) additional directories.
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

### Using this monorepo as a local dev dependency

For using this monorepo as a local dev dependency for `dependent project`,
following commands needs to be issued inside the monorepo directory after
it has been cloned to a local filesystem:

```sh
 $ npm i
 $ npm run build
 $ npm run link
```
This will install the dependencies, built the monorepo and link all it's packages to
global `node_modules`.

#### Usage in `dependent project`

Now that we have monorepo packages globally linked we can use them in `dependent project`.
Let's say `dependent project` needs to directly use following packages:

- @swagger-api/apidom-ast
- @swagger-api/apidom-core

Issuing following command from inside the `dependent project` will link these packages:

```sh
 $ npm link @swagger-api/apidom-ast @swagger-api/apidom-core
```

If more packages (or all of them) need to be used in `dependent project`, they need to be explicitly
enumerated using above command and separated by single empty space.

Notice that we link packages using single `npm link` command. This is necessary
because of how `npm link` works internally. Always use single `npm link` command with
multiple package names as argument.

**Don't ever do this!**

```sh
 $ npm link @swagger-api/apidom-ast
 $ npm link @swagger-api/apidom-core
```

> Setting up npm script in `dependent project` can help keep things DRY.

#### Cleaning up

##### Dependent project

The best way to unlink monorepo packages from `dependent project` is to run following command
inside the `dependent project`:

```shell
 $ npm i
```

Running `npm i` will remove the links to monorepo packages and install the packages from npm registry.

> Note: running `npm unlink <package-name>` in `dependent project` will remove the link to monorepo package,
but will leave the `dependent project` node_modules in corrupted state as there is no version of the package
installed anymore. Running `npm i` is always a prefered way to restore your node_modules to original state.


##### ApiDOM monorepo

It is not necessary to unlink monorepo packages from global `node_modules`. But if you
want to keep your global `node_modules` tidy you can run the following command in monorepo directory:

```shell
 $ npm run unlink
```

Running above npm script will unlink all monorepo packages from global `node_modules`.

If you want to just unlink particular monorepo packages, you have to enumerate them explicitly:

```shell
 $ npm unlink --global @swagger-api/apidom-ast @swagger-api/apidom-core
```

## Contributing

This project uses [swagger-api](https://github.com/swagger-api) GitHub organizations contributing guide.
You can obtain copy of this contributing guide at [https://github.com/swagger-api/.github/blob/master/CONTRIBUTING.md](https://github.com/swagger-api/.github/blob/master/CONTRIBUTING.md).
Read our contributing guide to learn about our development process, how to propose bugfixes and improvements,
and how to build and test your changes to ApiDOM.

## Documentation

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
<person name="John Doe" email="john@example.com"></person>
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

### ApiDOM stages

There are three stages to ApiDOM

- Parse stage
- Refract stage
- Generate stage


#### Parse stage

The parse stage takes JSON string and produces ApiDOM structure using the base ApiDOM namespace. There are two phases of parsing:

- Lexical Analysis phase
- Syntactic Analysis phase


##### Lexical Analysis phase

Lexical Analysis will take a JSON string and turn it into a stream of tokens. tree-sitter / web-tree-sitter is used
as an underlying lexical analyzer.

##### Syntactic Analysis

Syntactic Analysis will take a stream of tokens and turn it into an ApiDOM representation.
CST produced by lexical analysis is syntactically analyzed, and ApiDOM structure using base (generic) ApiDOM namespace is produced.
Syntactic analysis can further be direct or indirect. JSON parser has both direct and indirect syntactical analyzers,
but YAML parser only has an indirect one.

###### Direct Syntactical analysis

This analysis directly turns tree-sitter CST into ApiDOM. Single traversal is required, which makes it super performant,
and it's the default analysis used.

###### Indirect Syntactic analysis

This analysis turns trees-sitter CST into JSON AST representation. Then JSON AST is turned into ApiDOM.
Two traversals are required, which makes the indirect analysis less performant than the direct one.
Though less performant, having JSON AST representation allows us to do further complex analysis.

#### Refract stage

The refract stage takes a generic ApiDOM structure (base namespace) and traverses through it, adding, updating,
and removing nodes as it goes along and turning it into semantic ApiDOM structure (like OpenAPI or AsyncAPI).
This is by far the most complex part of ApiDOM. This is where plugins operate.
If plugins are used, additional traversal is currently needed.

#### Generate stage

We can currently only generate JSON documents from the ApiDOM structure.
It doesn't matter if the original document was originally defined in JSON or YAML.
Generated JSON documented will have exactly the same semantic information as the original one,
but the style information from the original document is not preserved (white spaces/comments, etc..).

---

Having said that, this is how JSON OpenAPI 3.1 document gets transformed into ApiDOM:


**with direct syntactic analysis (requires 2 traversals)**
```
JSON string -> tree-sitter CST ->  generic ApiDOM -> OpenAPI 3.1 ApiDOM
```

**with indirect syntactic analysis (requires 3 traversals)**
```
JSON string -> tree-sitter CST -> JSON AST -> generic ApiDOM -> OpenAPI 3.1 ApiDOM
```

**with direct syntactic analysis and additional plugins (requires 3 traversal)**
```
JSON string -> tree-sitter CST -> generic ApiDOM -> OpenAPI 3.1 ApiDOM -> plugins -> OpenAPI 3.1 ApiDOM
```
---

This very closely reflects how [Babel](https://github.com/babel/babel) works ([Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md)).
Their transform phase is our refract phase. The only difference is that when plugins are involved, our transform phase
requires 2 traversals instead of a single one. We can find a way in the future how to fold these 2 traversals into a single one.

## License

ApiDOM is licensed under [Apache 2.0 license](https://github.com/swagger-api/apidom/blob/main/LICENSES/Apache-2.0.txt).
ApiDOM comes with an explicit [NOTICE](https://github.com/swagger-api/apidom/blob/main/NOTICE) file
containing additional legal notices and information.

This project uses [REUSE specification](https://reuse.software/spec/) that defines a standardized method
for declaring copyright and licensing for software projects.

## Software Bill Of Materials (SBOM)

Software Bill Of materials is available in this repository [dependency graph](https://github.com/swagger-api/apidom/network/dependencies).
Click on `Export SBOM` button to download the SBOM in [SPDX format](https://spdx.dev/).

