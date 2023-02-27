# ApiDOM Language Service (apidom-ls)

The ApiDOM Language Service (apidom-ls) contains the language smarts powering ApiDOM supported languages processing, specifically editing experience.

ApiDOM Language Service APIs adhere to [LSP Protocol](https://microsoft.github.io/language-server-protocol/) and are therefore usable via a LSP Server wrapper in a variety of editors and IDEs.

## Installation

[Prerequisites](https://github.com/swagger-api/apidom/blob/main/README.md#prerequisites) need to satisfied for installing this package.
`@swagger-api/apidom-ls` is currently hosted on [GitHub packages registry](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages).
For installing `@swagger-api/apidom-ls` from GitHub packages registry, create `.npmrc` file in your current directory and add
the following line to it:

```
@swagger-api:registry=https://npm.pkg.github.com
```

You can now install the package using `npm`:

```sh
 $ npm install @swagger-api/apidom-ls
```

## Project current status

Please note that ApiDOM Language Service is still in unstable status, with planned APIs changes specifically in terms of "configuration rules" structure.

## Quick start (WIP)

### Validation

```
import { getLanguageService } from '@swagger-api/apidom-ls';
import { TextDocument } from 'vscode-languageserver-textdocument';
...

const apidomContext = {};
const languageService = getLanguageService(apidomContext);

const oas31orAsyncapiDoc = 'asyncapi: 2.2.0';
const doc = TextDocument.create('foo://bar/file.yaml', 'apidom', 0, oas31orAsyncapiDoc);
const diagnostics = await languageService.doValidation(document);
console.log(JSON.stringify(diagnostics, null, 2);

```

