# ApiDOM LSP

## Functionality

This Language Server works for "ApiDOM" Ns files (e.g. OpenAPI, AsyncAPI) . It has the following language features:


TODO


It also includes an End-to-End test.

## Structure

```
.
├── client // Language Client
│   ├── src
│   │   ├── test // End to End tests for Language Client / Server
│   │   └── extension.ts // Language Client entry point
├── package.json // The extension manifest.
└── server // Language Server
    └── src
        └── server.ts // Language Server entry point, uses apidom-ls
```


## Configure GOOD:

### build apidom:

```
GIT_ROOT=/dati/dev/progetti/swagger/projects/apidom/vscode
cd ${GIT_ROOT}/apidom/apidom
npm i
npm run build
```

### build apidom-lsp: (build.sh, buildall.sh with apidom)

ENSURE YOU HAVE node-gyp installed

`npm install -g node-gyp`

https://github.com/nodejs/node-gyp

Check version of electron in use by VSCODE (About menu item) and use that in sh scripts and/or here below as value for
`--target` e.g. `--target=12.0.7`

```


cd ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter
node-gyp rebuild --target=12.0.7 --arch=x64 --dist-url=https://electronjs.org/headers
cd ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter-json
node-gyp rebuild --target=12.0.7 --arch=x64 --dist-url=https://electronjs.org/headers
cd ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter-yaml
node-gyp rebuild --target=12.0.7 --arch=x64 --dist-url=https://electronjs.org/headers

cd ${GIT_ROOT}/apidom/experiments/apidom-lsp
npm install
cd ../server
npm install
npm run build
cd ../client
npm install
tsc -b
cd ../

# who knows..
cd ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter
node-gyp rebuild --target=12.0.7 --arch=x64 --dist-url=https://electronjs.org/headers
cd ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter-json
node-gyp rebuild --target=12.0.7 --arch=x64 --dist-url=https://electronjs.org/headers
cd ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter-yaml
node-gyp rebuild --target=12.0.7 --arch=x64 --dist-url=https://electronjs.org/headers
cd ${GIT_ROOT}/apidom/experiments/apidom-lsp

cd ${GIT_ROOT}/apidom/experiments/apidom-lsp

cp -a ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/src/services/validation/jsonSchema/openapiSchema.json ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/cjs/services/validation/jsonSchema/openapiSchema.json
cp -a ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/src/services/validation/jsonSchema/asyncapiSchema.json ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/cjs/services/validation/jsonSchema/asyncapiSchema.json
```

## Running

- Open VS Code workspace on this folder.
- Run configure above
- Switch to the Debug viewlet.
- Select `Launch Client` from the drop down.
- Run the launch config.
- If you want to debug the server as well use the launch configuration `Attach to Server`

- if something change, rebuild the package and relaunch


## Build and run monacoclient (at commit e752b87)

```
yarn
yarn run build
```
Debug Launch Configuration: MonacoClient Chrome

## Build and run monacoclient

```
cd <ROOT>/

```

## Configure OLD KEEP FOR REF

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
cd ../monacoclient
npm link ../apidomlsp
cd ../
npm link apidomlsp
```

### treesitter issue

```
npm install
cd apidomlsp
npm install
tsc
npm link
cd ../server
npm install
npm link ../apidomlsp
npm run build
cd ../client
npm install
npm link ../apidomlsp
tsc -b
cd ../monacoclient
npm link ../apidomlsp
cd ../
npm link apidomlsp
```

```
npm install --save-dev electron-rebuild
cd apidomlsp
npm install --save-dev electron-rebuild
tsc
npm link
cd ../server
npm install --save-dev electron-rebuild
npm link ../apidomlsp
npm run build
cd ../client
npm install --save-dev electron-rebuild
npm link ../apidomlsp
tsc -b
cd ../monacoclient
npm link ../apidomlsp
cd ../
npm link apidomlsp
```

/dati/dev/progetti/swagger/projects/apidom/vscode/apidom/apidom/node_modules/tree-sitter-json/build/Release/tree_sitter_json_binding.node

This doesn't work
see bash-server and others, tried rebuilding, tried as bash server use web-tree-sitter everywhere?
it fails with tree-sitter json after changing apidom to web-tree-sitter, try maybe not compiling? or?

https://github.com/bash-lsp/bash-language-server/issues/141#issuecomment-534242201
    https://github.com/bash-lsp/bash-language-server/pull/149


https://github.com/bash-lsp/bash-language-server/pull/147 !!
    https://github.com/tree-sitter/tree-sitter/issues/46 !!
    https://github.com/tree-sitter/node-tree-sitter/pull/45
https://github.com/tree-sitter/tree-sitter/issues/335 !!
https://github.com/bash-lsp/bash-language-server/issues/95 !!
https://www.electronjs.org/docs/tutorial/using-native-node-modules !!

https://github.com/bash-lsp/bash-language-server/pull/134
    https://github.com/rubyide/vscode-ruby


https://github.com/bash-lsp/bash-language-server/pull/72
https://github.com/bash-lsp/bash-language-server/issues/41
https://github.com/bash-lsp/bash-language-server/search?q=NODE_MODULE_VERSION+is%3Aissue+is%3Apr&type=Issues
https://github.com/bash-lsp/bash-language-server/commit/1be9b1e52a62b4d8c02c878dc73c7b04c5d52137

https://github.com/microsoft/vscode/issues/23251


#### other try


```
cd /dati/dev/progetti/swagger/projects/apidom/vscode/apidom/apidom/node_modules/tree-sitter
node-gyp rebuild --target=12.0.7 --arch=x64 --dist-url=https://electronjs.org/headers
cd /dati/dev/progetti/swagger/projects/apidom/vscode/apidom/apidom/node_modules/tree-sitter-json
node-gyp rebuild --target=12.0.7 --arch=x64 --dist-url=https://electronjs.org/headers
cd /dati/dev/progetti/swagger/projects/apidom/vscode/apidom/apidom/node_modules/tree-sitter-yaml
node-gyp rebuild --target=12.0.7 --arch=x64 --dist-url=https://electronjs.org/headers
cd ROOT
npm install
cd apidomlsp
npm install
tsc
npm link
cd ../server
npm install
npm link ../apidomlsp
npm run build
cd ../client
npm install
npm link ../apidomlsp
tsc -b
cd ../monacoclient
npm link ../apidomlsp
cd ../
npm link apidomlsp

cd /dati/dev/progetti/swagger/projects/apidom/vscode/apidom/apidom/node_modules/tree-sitter
node-gyp rebuild --target=12.0.7 --arch=x64 --dist-url=https://electronjs.org/headers
cd /dati/dev/progetti/swagger/projects/apidom/vscode/apidom/apidom/node_modules/tree-sitter-json
node-gyp rebuild --target=12.0.7 --arch=x64 --dist-url=https://electronjs.org/headers
cd /dati/dev/progetti/swagger/projects/apidom/vscode/apidom/apidom/node_modules/tree-sitter-yaml
node-gyp rebuild --target=12.0.7 --arch=x64 --dist-url=https://electronjs.org/headers


COPY in apidom-ls cjs  json of schemas in validation/schema

```
THis above seems good, remove electon and rebuild



Missing json modules not dist


Tried with web-tree-sitter removing node version and using anywhere, builds fine but error in lsp client

```
ALl packages
npm install --save-dev electron@12.0.7
npm install --save-dev electron-rebuild@2.3.2

npm install
./node_modules/.bin/electron-rebuild
cd apidomlsp
npm install
./node_modules/.bin/electron-rebuild
tsc
npm link
cd ../server
npm install
./node_modules/.bin/electron-rebuild
npm link ../apidomlsp
npm run build
cd ../client
npm install
./node_modules/.bin/electron-rebuild
npm link ../apidomlsp
tsc -b
cd ../monacoclient
npm link ../apidomlsp
cd ../
npm link apidomlsp
```

npm build with babel in server

## Running OLD

- Open VS Code on this folder.
- Press Ctrl+Shift+B to compile the client and (not any more) server.
- Switch to the Debug viewlet.
- Select `Launch Client` from the drop down.
- Run the launch config.
- If you want to debug the server as well use the launch configuration `Attach to Server`

