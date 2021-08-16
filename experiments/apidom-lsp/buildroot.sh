#!/bin/bash

GIT_ROOT="$(cd "$(dirname "$0")"/../../..; pwd -P)/$(basename "$1")"
GIT_ROOT=${GIT_ROOT%/}

cd ${GIT_ROOT}/apidom/apidom

rm -rf ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter
rm -rf ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter-json
rm -rf ${GIT_ROOT}/apidom/apidom/node_modules/tree-sitter-yaml

npm i
npm run build

