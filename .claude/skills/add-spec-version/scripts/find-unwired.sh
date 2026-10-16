#!/usr/bin/env bash
# Lists source files that mention the parent version but not the new one: the usual
# places where wiring for a new spec version gets forgotten.
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: find-unwired.sh [--all] <parent-id> <new-id>
  e.g. find-unwired.sh openapi-3-1 openapi-3-2       (run from the repository root)

Scans packages/ (*.ts, *.js, package.json; no tests or build output) plus the root package.json
(link/unlink scripts) and root README.md for files that mention the parent id
(openapi-3-1, openapi-json-3-1, openapi-yaml-3-1, 'openApi3_1') but never the new one.

A file is not reported when every line mentioning the parent also names the new version right
after it, e.g. `schema--type-openapi-3-1--3-2.ts` or `OpenAPI3_1__3_2`: such files are shared
by both versions already.

Ignored paths (known false positives; --all reports them too):
  packages/apidom-converter/             version-to-version conversion strategies
                                         (openapi-3-1-to-openapi-3-0-3); a strategy for the new
                                         version is a feature, not wiring
  packages/apidom-ns-api-design-systems/, ads-validation-provider.ts, *api-design-systems*
                                         API Design Systems is built on OpenAPI 3.1 by design

Options:
  --all       don't apply the ignore list
  -h, --help  show this help

Exit codes: 0 nothing unwired, 1 unwired files listed, 2 usage error.
EOF
}

ALL=0
ARGS=()
for arg in "$@"; do
  case "$arg" in
    -h | --help) usage; exit 0 ;;
    --all) ALL=1 ;;
    -*) echo "error: unknown option $arg" >&2; usage >&2; exit 2 ;;
    *) ARGS+=("$arg") ;;
  esac
done
if [ "${#ARGS[@]}" -ne 2 ]; then
  echo "error: <parent-id> and <new-id> required" >&2
  usage >&2
  exit 2
fi
PARENT=${ARGS[0]}
NEW=${ARGS[1]}
SPEC=$(echo "$PARENT" | sed -E 's/(-[0-9]+)+$//')  # openapi
if [ "$SPEC" = "$PARENT" ] || [ "${NEW#"$SPEC"-}" = "$NEW" ]; then
  echo "error: ids must be {spec}-{version} of the same spec, e.g. openapi-3-1 openapi-3-2" >&2
  exit 2
fi
if [ ! -d packages ]; then
  echo "error: run from the repository root (packages/ not found)" >&2
  exit 2
fi
PARENT_VER=${PARENT#"$SPEC"-}  # 3-1
NEW_VER=${NEW#"$SPEC"-}        # 3-2
# quoted element names such as 'openApi3_1' / 'asyncApi2' (matched case-insensitively; quoting
# skips target-spec constants like AsyncAPI2 that legitimately stay parent-only)
PARENT_JOINED="$SPEC${PARENT_VER//-/_}"
NEW_JOINED="$SPEC${NEW_VER//-/_}"
IGNORE_RE='^packages/apidom-converter/|api-design-systems|/ads-validation-provider\.ts$'

PARENT_PATTERNS=(-e "$PARENT" -e "$SPEC-json-$PARENT_VER" -e "$SPEC-yaml-$PARENT_VER"
  -e "['\"]$PARENT_JOINED['\"]")
NEW_PATTERNS=(-e "$NEW" -e "$SPEC-json-$NEW_VER" -e "$SPEC-yaml-$NEW_VER" -e "['\"]$NEW_JOINED['\"]")
# parent mention immediately followed by the new version: openapi-3-1--3-2, OpenAPI3_1__3_2
COVERED_PATTERNS=(-e "${PARENT_VER}[-_]+${NEW_VER}" -e "${PARENT_VER//-/_}[-_]+${NEW_VER//-/_}")

candidates=$(
  {
    grep -rli --include='*.ts' --include='*.js' --include='package.json' "${PARENT_PATTERNS[@]}" \
      packages --exclude-dir=node_modules --exclude-dir=test --exclude-dir=types \
      --exclude-dir=dist --exclude-dir=build || true
    for f in package.json README.md; do
      [ -f "$f" ] && grep -qi "${PARENT_PATTERNS[@]}" "$f" && echo "$f"
    done
  } | grep -v -e "/$PARENT/" -e "packages/apidom-ns-$PARENT/" -e "packages/apidom-ns-$NEW/" \
    -e "packages/apidom-parser-adapter-$SPEC-json-" -e "packages/apidom-parser-adapter-$SPEC-yaml-" \
    -e "/$SPEC-json-$PARENT_VER/" -e "/$SPEC-yaml-$PARENT_VER/" || true
)

found=()
while IFS= read -r f; do
  [ -z "$f" ] && continue
  if [ "$ALL" -eq 0 ] && [[ "$f" =~ $IGNORE_RE ]]; then continue; fi
  grep -qi "${NEW_PATTERNS[@]}" "$f" && continue
  # every parent mention already covers the new version too
  if ! grep -i "${PARENT_PATTERNS[@]}" "$f" | grep -qviE "${COVERED_PATTERNS[@]}"; then continue; fi
  found+=("$f")
done <<<"$candidates"

if [ "${#found[@]}" -eq 0 ]; then
  echo "No unwired files: every file mentioning $PARENT also mentions $NEW." >&2
  exit 0
fi
printf '%s\n' "${found[@]}" | sort
exit 1
