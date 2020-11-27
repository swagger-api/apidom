#!/bin/bash

GIT_ROOT="$(cd "$(dirname "$0")"/../..; pwd -P)/$(basename "$1")"
GIT_ROOT=${GIT_ROOT%/}

cd ${GIT_ROOT}/apidom/apidom/node_modules
rm -rf tree-sitter
rm -rf tree-sitter-json
rm -rf tree-sitter-yaml

cd ${GIT_ROOT}/apidom/apidom
npm install
npm run build
