#!/bin/bash

GIT_ROOT="$(cd "$(dirname "$0")"/../../..; pwd -P)/$(basename "$1")"
GIT_ROOT=${GIT_ROOT%/}

cd ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter
node-gyp rebuild --target=12.0.7 --arch=x64 --dist-url=https://electronjs.org/headers
cd ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter-json
node-gyp rebuild --target=12.0.7 --arch=x64 --dist-url=https://electronjs.org/headers
cd ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter-yaml
node-gyp rebuild --target=12.0.7 --arch=x64 --dist-url=https://electronjs.org/headers

cd ${GIT_ROOT}/apidom/experiments/apidom-lsp
npm install
cd server
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

cp -a ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/src/services/json-schema/openapi-schema.json ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/cjs/services/json-schema/openapi-schema.json
cp -a ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/src/services/json-schema/openapi-schema-idea.json ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/cjs/services/json-schema/openapi-schema-idea.json
cp -a ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/src/services/json-schema/asyncapi-schema.json ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/cjs/services/json-schema/asyncapi-schema.json
