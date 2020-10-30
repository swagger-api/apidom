# ApiDOM LSP

## Functionality

This Language Server works for "ApiDOM" Ns files (e.g. OpenAPI, AsyncAPI) . It has the following language features:


TODO


It also includes an End-to-End test.

## Structure

```
.
├── apidomlsp // ApiDOM language service library
│   └── src
│       └── server.ts // language service library entry point
├── client // Language Client
│   ├── src
│   │   ├── test // End to End tests for Language Client / Server
│   │   └── extension.ts // Language Client entry point
├── package.json // The extension manifest.
└── server // Language Server
    └── src
        └── server.ts // Language Server entry point
```

## Configure

From root:

```
npm i
cd apidomlsp
tsc
npm link
cd ../server
npm link ../apidomlsp
cd ../client
npm link ../apidomlsp
cd ../
npm link apidomlsp
```

## Running 

- Open VS Code on this folder.
- Press Ctrl+Shift+B to compile the client and server.
- Switch to the Debug viewlet.
- Select `Launch Client` from the drop down.
- Run the launch config.
- If you want to debug the server as well use the launch configuration `Attach to Server`


## Test apidomlsp

Use launch config Mocha apidomlsp or Mocha current file

## Build and run monacoclient

```
yarn
yarn run build
```
Debug Launch Configuration: MonacoClient Chrome