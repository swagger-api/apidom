#!/bin/bash

GIT_ROOT=/dati/dev/progetti/swagger/projects/apidom/git-lsp-new

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