#!/bin/bash

GIT_ROOT="$(cd "$(dirname "$0")"/../../..; pwd -P)/$(basename "$1")"
GIT_ROOT=${GIT_ROOT%/}

cd ${GIT_ROOT}/apidom/experiments/apidom-lsp
npm install
cd server
npm install
npm run build
cd ../client
npm install
tsc -b
cd ../


cd ${GIT_ROOT}/apidom/experiments/apidom-lsp

cp -a ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/src/services/json-schema/openapi-schema.json ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/cjs/services/json-schema/openapi-schema.json
cp -a ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/src/services/json-schema/openapi-schema-idea.json ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/cjs/services/json-schema/openapi-schema-idea.json
cp -a ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/src/services/json-schema/asyncapi-schema.json ${GIT_ROOT}/apidom/apidom/packages/apidom-ls/cjs/services/json-schema/asyncapi-schema.json
