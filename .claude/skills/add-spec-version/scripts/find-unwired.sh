#!/usr/bin/env bash
# Lists source files that mention the parent version but not the new one: the usual
# places where wiring for a new spec version gets forgotten.
#
# Usage: find-unwired.sh <parent-id> <new-id>      e.g. find-unwired.sh openapi-3-1 openapi-3-2
# Run from the repository root.
set -euo pipefail
PARENT=${1:?parent id, e.g. openapi-3-1}
NEW=${2:?new id, e.g. openapi-3-2}
SPEC=$(echo "$PARENT" | sed -E 's/(-[0-9]+)+$//')  # openapi
PARENT_VER=${PARENT#"$SPEC"-}  # 3-1
NEW_VER=${NEW#"$SPEC"-}        # 3-2
# quoted element names such as 'openApi3_1' / 'asyncApi2' (matched case-insensitively; quoting
# skips target-spec constants like AsyncAPI2 that legitimately stay parent-only)
PARENT_JOINED="$SPEC${PARENT_VER//-/_}"
NEW_JOINED="$SPEC${NEW_VER//-/_}"

grep -rli --include='*.ts' --include='*.js' --include='package.json' -e "$PARENT" \
  -e "$SPEC-json-$PARENT_VER" -e "$SPEC-yaml-$PARENT_VER" -e "['\"]$PARENT_JOINED['\"]" packages \
  --exclude-dir=node_modules --exclude-dir=test --exclude-dir=types --exclude-dir=dist --exclude-dir=build \
  | grep -v -e "/$PARENT/" -e "packages/apidom-ns-$PARENT/" -e "packages/apidom-ns-$NEW/" \
    -e "packages/apidom-parser-adapter-$SPEC-json-" -e "packages/apidom-parser-adapter-$SPEC-yaml-" \
    -e "/$SPEC-json-$PARENT_VER/" -e "/$SPEC-yaml-$PARENT_VER/" \
  | while read -r f; do grep -qi -e "$NEW" -e "$SPEC-json-$NEW_VER" -e "['\"]$NEW_JOINED['\"]" "$f" || echo "$f"; done \
  | sort
