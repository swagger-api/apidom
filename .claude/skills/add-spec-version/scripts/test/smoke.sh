#!/usr/bin/env bash
# Smoke test for the add-spec-version scripts: --help, bad arguments and one real invocation
# per script against this repository, checking exit codes (and a few key output lines).
#
# Usage: bash .claude/skills/add-spec-version/scripts/test/smoke.sh   (from any directory)
# Exit codes: 0 all checks passed, 1 a check failed.
# phase-status needs `git fetch origin main` for meaningful results and uses `gh` when present.
set -uo pipefail

SCRIPTS=$(cd "$(dirname "$0")/.." && pwd)
ROOT=$(cd "$SCRIPTS/../../../.." && pwd)
cd "$ROOT" || exit 1
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
FAILED=0

# check <name> <expected exit codes, e.g. "0" or "0|1"> <command...>; output in $TMP/out
check() {
  local name=$1 expected=$2
  shift 2
  "$@" >"$TMP/out" 2>&1
  local code=$?
  if [[ "|$expected|" == *"|$code|"* ]]; then
    printf 'ok    %-58s exit %s\n' "$name" "$code"
  else
    printf 'FAIL  %-58s exit %s, expected %s\n' "$name" "$code" "$expected"
    sed 's/^/      /' "$TMP/out" | tail -5
    FAILED=1
  fi
}
# expect_output <name> <grep -E pattern>: asserts on the last check's output
expect_output() {
  if grep -qE "$2" "$TMP/out"; then
    printf 'ok    %-58s\n' "$1"
  else
    printf 'FAIL  %-58s pattern not found: %s\n' "$1" "$2"
    FAILED=1
  fi
}
# expect_no_output <name> <grep -E pattern>: asserts the pattern is absent from the last output
expect_no_output() {
  if grep -qE "$2" "$TMP/out"; then
    printf 'FAIL  %-58s pattern found: %s\n' "$1" "$2"
    FAILED=1
  else
    printf 'ok    %-58s\n' "$1"
  fi
}

for script in check-ls-coverage check-redefined-fields check-test-parity phase-status verify-urls; do
  check "$script --help" 0 node "$SCRIPTS/$script.mjs" --help
  expect_output "$script --help documents exit codes" 'Exit codes'
  check "$script -h" 0 node "$SCRIPTS/$script.mjs" -h
  check "$script --bogus" 2 node "$SCRIPTS/$script.mjs" --bogus
  check "$script (no arguments)" 2 node "$SCRIPTS/$script.mjs"
done
check 'find-unwired.sh --help' 0 bash "$SCRIPTS/find-unwired.sh" --help
expect_output 'find-unwired.sh --help documents exit codes' 'Exit codes'
check 'find-unwired.sh --bogus' 2 bash "$SCRIPTS/find-unwired.sh" --bogus openapi-3-1 openapi-3-2
check 'find-unwired.sh (one argument)' 2 bash "$SCRIPTS/find-unwired.sh" openapi-3-1

# check-ls-coverage: elements inheriting `this.element` from the parent namespace are found
check 'check-ls-coverage openapi-3-2 --source' '0|1' node "$SCRIPTS/check-ls-coverage.mjs" \
  packages/apidom-ns-openapi-3-2 packages/apidom-ls/src/config/openapi --source
expect_output 'check-ls-coverage finds inherited element names' '^required +components '
expect_output 'check-ls-coverage counts discovered elements' '[0-9]+ element\(s\) discovered'

# check-ls-coverage: JSON Schema elements are named by `this.element` (not the registry key
# 'jSONSchema202012'); keywords a dialect drops (throwing getter, refractor dissocPath) are skipped
check 'check-ls-coverage json-schema-2020-12 --inherited' '0|1' node "$SCRIPTS/check-ls-coverage.mjs" \
  packages/apidom-ns-json-schema-2020-12 packages/apidom-ls/src/config/json-schema/2020-12 \
  --source --inherited
expect_output 'check-ls-coverage uses the element name' '^required +JSONSchema202012 '
expect_no_output 'check-ls-coverage skips removed keywords' 'additionalItems|\$recursiveRef|definitions'

# check-redefined-fields: asyncapi-3 Server.url is a known removal (Server.description, the known
# REDEFINED, was fixed in #5261)
check 'check-redefined-fields asyncapi-3' '0|1' node "$SCRIPTS/check-redefined-fields.mjs" \
  packages/apidom-ns-asyncapi-3
expect_output 'check-redefined-fields reports Server.url removal' "REMOVED .*Server\.ts: 'url' throws"
check 'check-redefined-fields openapi-3-2' '0|1' node "$SCRIPTS/check-redefined-fields.mjs" \
  packages/apidom-ns-openapi-3-2

# check-test-parity: --mask is whole-word (agentcard is not masked by "agent")
check 'check-test-parity a2a vs asyncapi-3 adapter' '0|1' node "$SCRIPTS/check-test-parity.mjs" \
  packages/apidom-parser-adapter-a2a-json-1/test/adapter.ts \
  packages/apidom-parser-adapter-asyncapi-json-3/test/adapter.ts --mask asyncapi,a2a,agent
expect_output 'check-test-parity masks whole words only' 'given agentcard definition'
printf "describe('a', function () {\n  it.only('x', () => {});\n  it('y', () => {});\n});\n" >"$TMP/new.ts"
printf "describe('a', function () {\n  it('x', () => {});\n  it('y', () => {});\n});\n" >"$TMP/sib.ts"
check 'check-test-parity flags .only' 1 node "$SCRIPTS/check-test-parity.mjs" "$TMP/new.ts" "$TMP/sib.ts"
expect_output 'check-test-parity lists ONLY' '^ONLY +a > x'

# phase-status: OpenAPI 3.2.0 is complete; A2A has no version field
check 'phase-status openapi 3.2.0' 0 node "$SCRIPTS/phase-status.mjs" --spec openapi --version 3.2.0
check 'phase-status a2a 1.0.0' 0 node "$SCRIPTS/phase-status.mjs" --spec a2a --version 1.0.0
expect_output 'phase-status a2a phase 3 done via parser dirs' 'Phase 3 reference +DONE'
check 'phase-status --phase 5' 2 node "$SCRIPTS/phase-status.mjs" --spec a2a --version 1.0.0 --phase 5

# phase-status: JSON Schema dialects take the dialect id as version (draft-07 means draft-7)
check 'phase-status json-schema 2020-12' '0|1' node "$SCRIPTS/phase-status.mjs" \
  --spec json-schema --version 2020-12
expect_output 'phase-status json-schema 2020-12 phase 2 done' 'Phase 2 parser-adapters +DONE'
check 'phase-status json-schema draft-07' '0|1' node "$SCRIPTS/phase-status.mjs" \
  --spec json-schema --version draft-07
expect_output 'phase-status normalises draft-07 to draft-7' 'BRANCH: +feat/json-schema-draft-7/phase-'
check 'phase-status dialect id on another spec' 2 node "$SCRIPTS/phase-status.mjs" \
  --spec openapi --version 2020-12

# find-unwired: 0 = nothing unwired, 1 = findings
check 'find-unwired openapi-3-0 -> openapi-3-1' '0|1' bash "$SCRIPTS/find-unwired.sh" openapi-3-0 openapi-3-1
check 'find-unwired openapi-3-1 -> openapi-3-2' '0|1' bash "$SCRIPTS/find-unwired.sh" openapi-3-1 openapi-3-2
check 'find-unwired nonexistent-1 -> nonexistent-2' 0 bash "$SCRIPTS/find-unwired.sh" nonexistent-1 nonexistent-2

# verify-urls: offline fixture (placeholders, example hosts and .patch files are skipped)
mkdir -p "$TMP/urls"
printf 'https://{host}.server.com/v1 https://example.com/a [x](https://www.example.org/b)\n' >"$TMP/urls/a.md"
printf 'https://this-host-does-not-exist.invalid/\n' >"$TMP/urls/b.patch"
check 'verify-urls offline fixture' 0 node "$SCRIPTS/verify-urls.mjs" --timeout 2000 "$TMP/urls"
check 'verify-urls --timeout abc' 2 node "$SCRIPTS/verify-urls.mjs" --timeout abc "$TMP/urls"

if [ "$FAILED" -ne 0 ]; then
  echo 'smoke test FAILED'
  exit 1
fi
echo 'smoke test passed'
