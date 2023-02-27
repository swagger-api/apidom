# ApiDOM Language Service (apidom-ls)

The ApiDOM Language Service (apidom-ls) contains the language smarts powering ApiDOM supported languages processing, specifically editing experience.

ApiDOM Language Service APIs adhere to [LSP Protocol](https://microsoft.github.io/language-server-protocol/) and are therefore usable via a LSP Server wrapper in a variety of editors and IDEs.

## Installation

After [prerequisites](https://github.com/swagger-api/apidom/blob/main/README.md#prerequisites) for installing this package are satisfied, you can install it
via [npm CLI](https://docs.npmjs.com/cli) by running the following command:

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

