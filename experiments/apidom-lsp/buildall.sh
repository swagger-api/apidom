#!/bin/bash

GIT_ROOT="$(cd "$(dirname "$0")"/../../..; pwd -P)/$(basename "$1")"
GIT_ROOT=${GIT_ROOT%/}

cd ${GIT_ROOT}/apidom/apidom
npm i
npm run build

cd ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter
node-gyp rebuild --target=9.3.3 --arch=x64 --dist-url=https://electronjs.org/headers
cd ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter-json
node-gyp rebuild --target=9.3.3 --arch=x64 --dist-url=https://electronjs.org/headers
cd ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter-yaml
node-gyp rebuild --target=9.3.3 --arch=x64 --dist-url=https://electronjs.org/headers

cd ${GIT_ROOT}/apidom/experiments/apidom-lsp
npm install
cd utils
npm install
tsc
npm link
cd ../server
npm install
npm link ../utils
npm run build
cd ../client
npm install
npm link ../utils
tsc -b
cd ../monacoclient
npm link ../utils
cd ../
npm link utils

# who knows..
cd ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter
node-gyp rebuild --target=9.3.3 --arch=x64 --dist-url=https://electronjs.org/headers
cd ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter-json
node-gyp rebuild --target=9.3.3 --arch=x64 --dist-url=https://electronjs.org/headers
cd ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter-yaml
node-gyp rebuild --target=9.3.3 --arch=x64 --dist-url=https://electronjs.org/headers
cd ${GIT_ROOT}/apidom/experiments/apidom-lsp

cd ${GIT_ROOT}/apidom/experiments/apidom-lsp

// cp -a ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/src/services/validation/jsonSchema/openapiSchema.json ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/cjs/services/validation/jsonSchema/openapiSchema.json
// cp -a ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/src/services/validation/jsonSchema/asyncapiSchema.json ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/cjs/services/validation/jsonSchema/asyncapiSchema.json
cp -a ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/src/services/jsonSchema/openapiSchema.json ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/cjs/services/jsonSchema/openapiSchema.json
cp -a ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/src/services/jsonSchema/asyncapiSchema.json ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/cjs/services/jsonSchema/asyncapiSchema.json
