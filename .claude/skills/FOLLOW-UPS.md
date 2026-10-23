# Follow-ups from the Skills Restructuring Session (2026-10-14)

These items came up while splitting the spec skills, adding `/add-spec-version` and running the first evals, and (2.7-2.10) while analyzing the PR #5182 (A2A) review with the new coverage scripts. None were fixed in those sessions. Each section says what was found, how to check it is still true, and how to fix it.

Status legend: ⏳ open, ✅ done (add commit/PR reference).

---

## 1. ⏳ Anchor format in OAS documentation URLs (decided 2026-10-15, link fixes open)

**Finding.** `CLAUDE.md` ("apidom-ls Documentation URL Requirements") says OAS 3.2+ doc links must use camelCase anchors (`3.2.0.md#pathItemObject`). The upstream markdown no longer has them:

- `versions/3.2.0.md` uses kebab-case everywhere: object headings (`#path-item-object`) and field anchors (`<a name="response-description">`).
- `versions/3.1.0.md` mixes them: camelCase field anchors (`<a name="responseDescription">`), kebab-case object headings (`#path-item-object`). So `3.1.0.md#pathItemObject` is broken too.
- `versions/2.0.md` object headings are kebab-case (`#contact-object`); links like `#contactObject` are broken.

`verify-urls.mjs` reports 58 broken anchors in the OAS 3.2 LS docs and 31 in the 2.0 docs. Three independent eval runs reached the same conclusion.

**Check it is still true.**

```bash
node .claude/skills/add-spec-version/scripts/verify-urls.mjs packages/apidom-ls/src/config/openapi \
  | grep '^BROKEN' | grep -E '3\.2\.0\.md|2\.0\.md|3\.1\.0\.md'
```

**Decision (2026-10-15): accepted.** The "camelCase" rule is dropped; the rule is now "use the anchor that exists in the spec markdown, verified with `verify-urls.mjs`".

Steps 1-4 are done (skills restructuring branch, skills audit). Step 5 is open:

1. `CLAUDE.md`, "apidom-ls Documentation URL Requirements": replace the camelCase rule and the per-version anchor list.
2. `.claude/skills/update-ls-config/SKILL.md`, Critical Rule 7 and the final checklist item about camelCase anchors.
3. `.claude/skills/update-ls-config/references/completion-and-documentation.md`, the note at the top.
4. `.claude/skills/review-ls-changes/references/docs-completion-anchor-checks.md`, the anchor format table row for GitHub markdown.
5. Then fix the links themselves in a separate commit (`fix(ls): correct OpenAPI documentation anchors`): run the command above, rewrite each broken anchor to the one that exists, and re-run until 0 `BROKEN`.

---

## 2. Probable bugs on main

Each was spotted during evals or by the new scripts and checked once against `main`. Re-check before fixing. Use one PR per item (or per package). Each fix needs a test.

### 2.1 ⏳ `rootElementTypes` missing `openApi3_2` and `asyncApi3`

- **Where:** `packages/apidom-ls/src/services/validation/linter-functions.ts:40`:
  `const rootElementTypes = ['swagger', 'openApi3_0', 'openApi3_1', 'asyncApi2'];`
- **Effect:** linter functions that walk up to the document root don't stop at OAS 3.2 / AsyncAPI 3 roots, so rules relying on the root (e.g. checks against defined components) may misbehave for those versions.
- **Fix:** add `'openApi3_2'` and `'asyncApi3'`. Confirm the element names in `apidom-ns-openapi-3-2/src/elements/OpenApi3-2.ts` and `apidom-ns-asyncapi-3/src/elements/AsyncApi3.ts`. Add apidom-ls tests with an OAS 3.2 document and an AsyncAPI 3.0 document that each hit a root-dependent rule.
- **Commit:** `fix(ls): recognize OpenAPI 3.2 and AsyncAPI 3 root elements in linter functions`

### 2.2 ⏳ `Response.description` still required for OAS 3.2

- **Where:** `packages/apidom-ls/src/config/openapi/response/lint/description--required.ts` uses `targetSpecs: [...OpenAPI2, ...OpenAPI3]`, which includes 3.2. The 3.2 hover docs and completion in `response/documentation.ts` / `completion.ts` also say **REQUIRED**.
- **Spec:** 3.2.0 `response-description` row has no REQUIRED; 3.1.0 had it.
- **Fix:** scope the rule to `[...OpenAPI2, ...OpenAPI30, ...OpenAPI31]` (consider renaming per the version-suffix convention), and drop **REQUIRED** from the 3.2 docs and completion entries. Add a test: an OAS 3.2 response without `description` yields no apilint diagnostic, while 3.1 still does.
- **Commit:** `fix(ls): make Response description optional for OpenAPI 3.2`

### 2.3 ✅ AsyncAPI 3 `Server.description` redefines the parent getter (done in #5261)

- **Where:** `packages/apidom-ns-asyncapi-3/src/elements/Server.ts:43` duplicates `apidom-ns-asyncapi-2/src/elements/Server.ts:44` with the same type.
- **Found by:** `node .claude/skills/add-spec-version/scripts/check-redefined-fields.mjs packages/apidom-ns-asyncapi-3`
- **Fix:** remove the getter and setter from the AsyncAPI 3 class. Low risk, cleanup only. Run that package's tests.
- **Commit:** `refactor(ns-asyncapi-3): remove redundant Server description accessor`

### 2.4 ⏳ Playground has no AsyncAPI 3 wiring

- **Where:** `packages/apidom-playground/package.json`, `src/playground/apidom.worker.js` and `src/playground/selectors.js` have no AsyncAPI 3 namespace or adapters.
- **Found by:** `.claude/skills/add-spec-version/scripts/find-unwired.sh asyncapi-2 asyncapi-3`
- **Fix:** mirror the OAS 3.2 wiring (see `git show ef97b5c32 -- packages/apidom-playground`): dependencies, `.use()` of both adapters in the worker, and the namespace/media-type branch in selectors. Check it by running the playground and parsing an AsyncAPI 3 document.
- **Commit:** `feat(playground): add AsyncAPI 3 support`

### 2.5 ⏳ Root `unlink` script is missing packages

- **Where:** the root `package.json` `scripts.unlink`. It is missing more than 3.2 and A2A. Currently missing:
  `apidom-logging`, `apidom-ns-a2a-1`, `apidom-ns-arazzo-1`, `apidom-ns-json-schema-2019-09`, `apidom-ns-json-schema-2020-12`, `apidom-ns-openapi-3-2`, `apidom-parser-adapter-a2a-json-1`, `apidom-parser-adapter-a2a-yaml-1`, `apidom-parser-adapter-json-schema-json-2020-12`, `apidom-parser-adapter-json-schema-yaml-2020-12`, `apidom-parser-adapter-openapi-json-3-2`, `apidom-parser-adapter-openapi-yaml-3-2`.
- **Check:**

  ```bash
  for p in $(ls packages); do jq -r .scripts.unlink package.json | grep -q "@swagger-api/$p\b" || echo "missing: $p"; done
  ```

  (Ignore `@types`; it is not a package.)
- **Fix:** add the missing `@swagger-api/*` names. Consider deriving the list from `packages/*/package.json` so it can't drift again.
- **Commit:** `chore: add missing packages to unlink script`

### 2.6 ⏳ `apidom-reference` has no `exports` entry for the AsyncAPI 3 dereference strategy

- **Where:** `packages/apidom-reference/package.json` has `./dereference/strategies/asyncapi-2` (line ~214) but no `asyncapi-3`, although `src/dereference/strategies/asyncapi-3/` exists.
- **Fix:** add the `asyncapi-3` entry with the same `import`/`require`/`types` shape as `asyncapi-2`. Check the other AsyncAPI 3 resolve, bundle and parser subpaths at the same time. Verify by importing `@swagger-api/apidom-reference/dereference/strategies/asyncapi-3` from a built package.
- **Commit:** `fix(reference): export AsyncAPI 3 dereference strategy`

---

### 2.7 ⏳ A2A documentation links point at non-existent anchors

- **Where:** `packages/apidom-ls/src/config/a2a/a2a1/completion.ts` and `a2a1/documentation.ts` link to `https://a2a-protocol.org/latest/definitions/#agent-card`, `#agent-capabilities`, `#agent-provider`, `#agent-skill`, `#agent-interface`, `#agent-card-signature`, `#security-scheme`, `#security-requirement` (11 occurrences); `agent-provider/documentation.ts:5` links to `/latest/specification/#agentprovider`. None of these anchors exist. PR #5182 review fixed the element directories but not these.
- **Found by:** `node .claude/skills/add-spec-version/scripts/verify-urls.mjs packages/apidom-ls/src/config/a2a` (9 `BROKEN` URLs).
- **Fix:** use `https://a2a-protocol.org/latest/specification/#{section}-{objectname}` with the section ids from the page (`#441-agentcard`, `#442-agentprovider`, `#443-agentcapabilities`, `#445-agentskill`, `#446-agentinterface`, `#447-agentcardsignature`, `#451-securityscheme`; check the security requirement anchor on the page, the spec may only describe it inline). Re-run until 0 `BROKEN`.
- **Commit:** `fix(ls): correct A2A documentation links`

### 2.8 ⏳ A2A Agent Card scalar fields have no hover documentation

- **Where:** `packages/apidom-ls/src/config/a2a/a2a1/documentation.ts` documents only the object-valued fields. `name`, `description`, `version`, `iconUrl`, `documentationUrl`, `defaultInputModes`, `defaultOutputModes` have no entry.
- **Found by:** `node .claude/skills/add-spec-version/scripts/check-ls-coverage.mjs packages/apidom-ns-a2a-1 packages/apidom-ls/src/config/a2a --ignore stringList --orphans` (`NO-DOCS a2aAgentCard1`).
- **Fix:** add one `target` entry per field with the spec's description and a link to `#441-agentcard`. Add a hover test for one of them.
- **Commit:** `feat(ls): add A2A Agent Card field documentation`

### 2.9 ⏳ A2A `securityRequirement.schemes` has no type lint

- **Where:** `packages/apidom-ls/src/config/a2a/security-requirement/lint/` has only `allowed-fields`.
- **Found by:** the same `check-ls-coverage.mjs` run (`NO-TYPE securityRequirement schemes`).
- **Fix:** add `schemes--type.ts` (`apilintType`, `object`; or the map-values form used for similar maps), a new code in `codes.ts`, and a test with full `Diagnostic` objects.
- **Commit:** `feat(ls): add A2A security requirement schemes type lint`

### 2.10 ✅ AsyncAPI 3 placeholder lint rules never run (done in PR #5264, phase 4 of AsyncAPI 3.1.0)

- **Where:** 20 lint files in `packages/apidom-ls/src/config/asyncapi` contain only `targetSpecs` (some with `// add remaining docs here`) and no `linterFunction`, `code` or `message`, e.g. `server/lint/host--required.ts`, `server/lint/host--type.ts`, `channel/lint/address--type.ts`, `channel/lint/allowed-fields.ts`, `components/lint/replies--values-type.ts`, `async-api-version/lint/value--pattern-3-0-0.ts`. They are registered in the `lint/index.ts` files, so they look like coverage but validate nothing: an AsyncAPI 3.0 server without `host` gets no diagnostic. Added in #5102.
- **Found by:** `check-ls-coverage.mjs packages/apidom-ns-asyncapi-3 packages/apidom-ls/src/config/asyncapi` (`STUB`), and `grep -L linterFunction $(find packages/apidom-ls/src/config -path '*/lint/*.ts' ! -name index.ts)`.
- **Fix:** implement each rule after the 2.x sibling rule of the same field (copy message pattern, linter function, a new code), scoped to `AsyncAPI3`. Add tests per rule. Then re-run the script: 0 `STUB`.
- **Commit:** `fix(ls): implement AsyncAPI 3 placeholder lint rules`
- **Done:** 18 placeholder rules implemented for 3.0.0 and 3.1.0 (Channel, Server, Info, Components, Security Scheme), plus new `availableScopes` (OAuth Flow) and `title` (Operation Trait) type rules. `security-scheme/lint/scopes--type.ts` was also missing from its `index.ts`; the empty duplicate `channel/lint/allowed-fields.ts` was deleted. `check-ls-coverage` reports 0 `STUB`. `multiFormatSchema.schema` intentionally has no type rule (spec: any value).

### 2.11 ⏳ A2A completion items use condition functions that don't exist

- **Where:** `packages/apidom-ls/src/config/a2a/a2a1/completion.ts` (from line ~211): 10 items with `conditions: [{ function: 'isInsideAgentCapabilities' }]`, `isInsideAgentSkill`, and similar.
- **Effect:** no such functions exist; `utils/utils.ts` skips unknown condition functions without failing, so these completion items are offered everywhere in an Agent Card, not only inside the intended object. The names came from an invented template in `update-ls-config` (fixed in the 2026-10-15 skills audit).
- **Check:** `grep -rn "isInside" packages/apidom-ls/src --include='*.ts'` and compare with the condition functions the completion service actually defines.
- **Fix:** move each field's completion item into its element's own `completion.ts` (e.g. `config/a2a/agent-capabilities/completion.ts`) without conditions, as other specs do, and drop them from the root file. Add a completion test for one nested object.
- **Commit:** `fix(ls): scope A2A completion items to their objects`

### 2.12 ⏳ OpenAPI 2 dereference strategy re-exports an AsyncAPI 2 type

- **Where:** `packages/apidom-reference/src/dereference/strategies/openapi-2/index.ts:42`: `export type { AsyncAPI2DereferenceVisitorOptions } from '../asyncapi-2/visitor.ts';`. The other OpenAPI strategies export their own visitor options (`openapi-3-0/index.ts:23`).
- **Found by:** `find-unwired.sh` during the 2026-10-15 skills audit. Probably a copy-paste slip.
- **Fix:** export the OpenAPI 2 visitor options type from `./visitor.ts` instead (check its exported name). Type-only change; run `npm run typescript:check-types` in apidom-reference.
- **Commit:** `fix(reference): export OpenAPI 2 dereference visitor options type`

### 2.13 ⏳ OAS 3.2 `$self` URI lint rule is never registered

- **Where:** `packages/apidom-ls/src/config/openapi/openapi3_2/lint/self--format-uri-reference.ts` exists but isn't imported in `openapi3_2/lint/index.ts`, so an invalid `$self` gets no diagnostic.
- **Check:** `grep -c "self--format" packages/apidom-ls/src/config/openapi/openapi3_2/lint/index.ts` prints 0.
- **Careful:** it uses `linterFunction: 'apilintValidURIReferenceOrFragment'`, which is not defined anywhere in `packages/apidom-ls/src` (only in config files). Registering it as is would hit an unknown linter function at validation time. Implement the function (or use an existing URI-reference linter function) first.
- **Fix:** then import and register it; add a test with an invalid `$self` and a full `Diagnostic` object. While there, check its code (`OPENAPI3_2_OPEN_API_FIELD_SELF_FORMAT_URI_REFERENCE = 7111001`; the first rule of a field is usually `...00`).
- **Commit:** `fix(ls): register OpenAPI 3.2 $self format lint rule`

### 2.14 ⏳ `codes.ts` oddities (check before changing, codes are user-visible)

- Some `OPENAPI3_2_EXAMPLE_*` / `OPENAPI3_2_DISCRIMINATOR_*` codes sit inside the 3.0 range (5200500, 5250300).
- A constant is spelled `OPENAPI3_O_SERVER_...` (letter O instead of zero).
- Renaming a constant is internal; changing a numeric code changes what users see and may break suppressions, so decide per item.

### 2.15 ⏳ A2A required-field messages deviate from the repo pattern

- **Where:** the 56 `*--required.ts` rules under `packages/apidom-ls/src/config/a2a/` use `"should always have a '{field}' field"`; the other 165 required rules in apidom-ls use `"should always have a '{field}'"`.
- **Fix:** align the A2A messages (and their test expectations). User-visible text change only; codes stay. Until then the skills tell agents not to copy the A2A form.
- **Commit:** `fix(ls): align A2A required-field lint messages`

### 2.16 ⏳ OAS 3.2 LS gaps reported by the improved `check-ls-coverage.mjs`

Found by the scripts agent during the 2026-10-15 skills audit; re-check each with `check-ls-coverage.mjs packages/apidom-ns-openapi-3-2 packages/apidom-ls/src/config/openapi` (build apidom-ls first, the script warns when the build is stale):

- no `openapi` version value-pattern rule for 3.2.0, although `OPENAPI3_2_OPENAPI_VALUE_PATTERN_3_2_0` exists in `codes.ts`
- no `components.schemas` values-type rule for 3.2; 28 common schema lint files target `OpenAPI31` only
- hover docs missing for `defaultMapping`, `dataValue`, `serializedValue`, `prefixEncoding`, `deviceAuthorizationUrl`, `oauth2MetadataUrl`, `deprecated`
- completion items missing for Media Type `prefixEncoding` / `itemEncoding`
- A2A adapter READMEs list only 1.0.0 media types although the namespace also has 1.0.1

### 2.17 ⏳ Missing `--equals` / `--format-*` rules in AsyncAPI 3 and A2A

Since the PR #5259 review, `--equals` and `--format-*` rules are required for every field with a fixed set of values or a URI/email format (`update-ls-config`, check 4.6 of `review-ls-changes`). Existing configs that predate this:

- AsyncAPI 3 Operation `action` (`send` | `receive`) has only `action--required.ts` and `action--type.ts`. (Still open after PR #5264, which only filled type rules.)
- AsyncAPI Security Scheme `type--equals-2-1--2-6.ts` targets 2.1.0-2.6.0 only, so an AsyncAPI 3.0 security scheme `type` isn't checked. Confirm the 3.0.0 value list matches 2.6.0, then extend `targetSpecs` (or add a 3.0 file if it differs).
- A2A has no `--format-*` rules at all (`find packages/apidom-ls/src/config/a2a -name '*--format*'` prints nothing), although its allowed fields include `url`, `iconUrl`, `documentationUrl`, `authorizationUrl`, `tokenUrl`, `refreshUrl`, `deviceAuthorizationUrl` and `openIdConnectUrl`. Check each against the spec text before adding a rule.
- **Fix:** add the rules with new codes in `codes.ts` and tests with full `Diagnostic` objects.
- **Commit:** `feat(ls): add missing AsyncAPI 3 and A2A value lint rules`

### 2.18 ⏳ AsyncAPI 3 empty-document completion offers only 2.6.0 and 3.1.0

- **Where:** `packages/apidom-ls/src/services/completion/completion-service.ts`, the "no version" branch. After PR #5264 it offers `asyncapi: '2.6.0'` and `asyncapi: '3.1.0'`; `3.0.0` is not offered, and OpenAPI 3.2 is missing next to `openapi: '3.0.4'` / `'3.1.0'`.
- **Fix:** decide whether to offer every supported minor, or the latest of each major, then add the missing items (OpenAPI 3.2.0 at least) and extend the `empty yaml document` test in `test/complete.ts`.
- **Commit:** `feat(ls): offer OpenAPI 3.2 in empty document version completion`

### 2.19 ⏳ `$ref` in AsyncAPI 3 Channel `servers` reports "local reference not found"

- **Where:** a channel with `servers: [{ $ref: '#/servers/server1' }]` (server defined at the root) gets an apilint diagnostic "local reference not found" on the `$ref` value, although the target exists. References for `operation.channel` and `reply.channel` resolve fine. Likely the reference check doesn't know the `referenced-element` value `channel-servers` that `apidom-ns-asyncapi-3` sets in `refractor/visitors/async-api-3/channel/ServersVisitor.ts`.
- **Check:** validate a 3.1.0 document with that shape through `languageService.doValidation`. Found while writing `test/fixtures/validation/asyncapi/fields-types-valid-3-1.yaml`, which uses `servers: []` to avoid it.
- **Fix:** find where local references are resolved by `referenced-element` in apidom-ls and add the missing mapping (or set a known value in the visitor). Add a validation test with a full `Diagnostic` comparison; switch the valid fixture to a real server reference.
- **Commit:** `fix(ls): resolve local references in AsyncAPI 3 channel servers`

### 2.20 ⏳ AsyncAPI 3 `Server.pathName` getter reads the wrong key

- **Where:** `packages/apidom-ns-asyncapi-3/src/elements/Server.ts:36` does `this.get('pathName')`, but the spec field and the refractor key (`refractor/specification.ts:280`) are `pathname`, so the getter never returns the parsed value. The setter has the same key.
- **Found by:** `check-ls-coverage.mjs packages/apidom-ns-asyncapi-3 packages/apidom-ls/src/config/asyncapi` reports `NO-TYPE/NOT-ALLOWED/NO-COMPL/NO-DOCS server pathName` because it matches getters by key.
- **Fix:** rename the getter/setter to `pathname` (check callers with `grep -rn pathName packages`), then add a namespace test that parses a server with `pathname` and reads it back. The LS `pathname` rules added in PR #5264 already use the document key, so they don't change.
- **Commit:** `fix(ns-asyncapi-3): read Server pathname from the pathname key`

### 2.21 ⏳ AsyncAPI 3 OAuth `implicit` flow requires `tokenUrl`

- **Where:** `packages/apidom-ls/src/config/asyncapi/oauth-flow/lint/token-url--required.ts` (and `authorization-url--required.ts`, `scopes--required.ts`) apply to every flow type. In AsyncAPI 3.x `tokenUrl` is required only for `password`, `clientCredentials` and `authorizationCode`; `implicit` needs `authorizationUrl` and `availableScopes`. A valid 3.x implicit flow gets "should always have a 'tokenUrl'" (code 290201).
- **Check:** validate an `oauth2` security scheme with only `implicit: { authorizationUrl, availableScopes }` in a 3.1.0 document.
- **Fix:** scope the required rules per flow and version (condition on the parent flow key), and use `availableScopes` instead of `scopes` for 3.x. (The 3.x OAuth Flow allowed-fields rule was added in PR #5264.) Add tests per flow type with full `Diagnostic` objects.
- **Commit:** `fix(ls): validate AsyncAPI 3 OAuth flow required fields per flow type`

### 2.22 ✅ Remaining AsyncAPI 3 `check-ls-coverage` findings (done in PR #5264, phase 4 of AsyncAPI 3.1.0)

Done: hover docs for `externalDocs` (AsyncAPI 3) on channel, components, info, message, message trait, operation trait, server and tag (the "omitted fields" header comments now say AsyncAPI 2 only); `title` completion and a new `allowed-fields-3-0--3-1.ts` for Operation Trait; `allowed-fields-3-0--3-1.ts` for OAuth Flow (`availableScopes`); `scopes` completion for Security Scheme.

Still reported by `check-ls-coverage.mjs packages/apidom-ns-asyncapi-3 packages/apidom-ls/src/config/asyncapi --source`, all expected:

- `NO-TYPE multiFormatSchema.schema`: any value is allowed, so no type rule fits.
- `NO-COMPL ros2OperationBinding` / `ros2ServerBinding`: false positive with `--source`; the completion lives in `bindings/ros2/*/completion/` and is covered by tests.
- `server.pathName` (4 findings): caused by the getter bug in 2.20; docs, completion, type and allowed-fields for `pathname` exist.

### 2.23 ⏳ AsyncAPI 3 `referenced-element` meta values don't match element names

- **Where:** `apidom-ns-asyncapi-3` sets `referenced-element` to element names in most visitors (`operationReply`, `operationTrait`, `messageTrait`, …) but uses other strings in some: `operation-reply-address` (`components/ReplyAddressesVisitor.ts`) while `operation-reply/AddressVisitor.ts` sets `operationReplyAddress` for the same target, and `channel-servers`, `operation-message`, `operation-reply-message`, `ExternalDocumentation` (`generics/ExternalDocumentationVisitor.ts`). LS rules have to list both forms, e.g. `components/lint/reply-addresses--values-type.ts` uses `['operationReplyAddress', 'operation-reply-address']`. Raised in the PR #5264 review.
- **Fix:** set the referenced element name (`operationReplyAddress`, `server`, `message`, `externalDocumentation`) in the visitors, then drop the duplicate names from the LS rules. Check consumers first (`grep -rn "referenced-element" packages/apidom-reference packages/apidom-ls`): the dereference strategy copies the value onto the referenced element and the LS uses it to find local reference targets (may also fix 2.19).
- **Commit:** `fix(ns-asyncapi-3): use element names for referenced-element meta`

### 2.24 ⏳ The JSON Schema 2020-12 LS config can't reach a standalone document

- **Where:** `packages/apidom-ls/src/config/config.ts` registers the 2020-12 config under `'json-schema-2020-12'`, while `config/json-schema/2020-12/target-specs.ts` declares `namespace: 'json-schema'`, and neither `parser-factory.ts` nor `utils/utils.ts` has a JSON Schema branch. `setMetadataMap` picks the config by the detected namespace and the services compare that namespace with `targetSpecs`, so no detected namespace satisfies both. The same config registers `LinkDescription`, but the element is named `linkDescription`.
- **Found by:** `check-ls-coverage.mjs packages/apidom-ns-json-schema-2020-12 packages/apidom-ls/src/config/json-schema/2020-12 --source --inherited --orphans` (`NO-META linkDescription`, `NO-ELEMENT LinkDescription`) and reading `parser-factory.ts` (2026-10-23).
- **Fix:** phase 4 of JSON Schema 2020-12, per `add-spec-version/references/json-schema-dialects.md` sections 4 and 5.

---

## 3. Session leftovers (cleanup)

| Item | Location | What to do |
|------|----------|------------|
| Eval viewer server | http://localhost:3117 (pid in `/tmp/eval-viewer.pid`) | From iteration 1; `kill $(cat /tmp/eval-viewer.pid)` if still running |
| Eval workspace | `~/WebstormProjects/apidom-skills-workspace` (outside the repo) | Holds iteration 1, the prepared iteration 2 (section 4), snapshots, graders (`graders/grade.py`) and ground-truth PR comments. Keep it until section 4 is done |
| Git worktrees | `wt-review`, `wt-pre-oas32`, `wt-pre-asyncapi3-ls`, `wt-pre-a2a`, `wt-asyncapi26-ns`, `wt-asyncapi26-adapters`, `wt-a2a-ls1`, `wt-asyncapi26-ref`, `wt-main` in the workspace | Fixtures for section 4; remove with the commands below afterwards |
| Branch | `eval/review-planted-defects` | Recreate any time from `main` + the patch (see the eval's `fixture.note`) |
| ✅ Stale doc | `.claude/skills/SKILL-SUMMARY.md` | Deleted in the 2026-10-15 skills audit |

Cleanup commands (run from the repo root, after section 4 is done):

```bash
kill $(cat /tmp/eval-viewer.pid) 2>/dev/null
for wt in wt-review wt-pre-oas32 wt-pre-asyncapi3-ls wt-pre-a2a wt-asyncapi26-ns wt-asyncapi26-adapters wt-a2a-ls1 wt-asyncapi26-ref wt-main; do
  git worktree remove ../apidom-skills-workspace/$wt
done
git branch -D eval/review-planted-defects
rm -rf ../apidom-skills-workspace   # optional
```

---

## 4. ⏳ Eval iteration 2 and description optimization (deferred: token-heavy)

Deferred on 2026-10-15 because a full run is expensive: 14 evals × 2 configurations = 28 agent runs (several write whole config directories), plus 28 grading runs. Run it as its own session, or start with the subset below.

**What is ready:**

- Baseline snapshot of the skills before the 2026-10-15 audit: `apidom-skills-workspace/skill-snapshot-iter2/`.
- `apidom-skills-workspace/iteration-2/eval-{skill}--{eval-name}/eval_metadata.json` for all 14 evals (prompt, fixture worktree, assertions), with empty `new_skill/outputs` and `old_skill/outputs`.
- Fixture worktrees (section 3), one per fixture commit; `wt-main` is `f85f39593`.
- Two evals on versions no skill or `CLAUDE.md` mentions, so they measure generalization rather than recall: `add-spec-version` eval 4 (Arazzo 1.1.0, extend variant) and eval 5 (Overlay 1.2.0, brand-new spec). Their assertions were written from the spec markdown on 2026-10-15.

**Cheapest useful run (4 agent runs + grading):** `add-spec-version` evals 4 and 5, new skills vs snapshot. They are planning-only, and they are the only evals the answers haven't leaked into.

**Full run:** for each eval, one runner with the new skills (`.claude/skills`) and one with the snapshot, both read-only in the fixture worktree, writing to `outputs/` plus an `actions.md` log (commands run, assumed answers to questions, final message). Runners must read the skill files directly from their skills root and must not use the Skill tool, which would load the current skills for both configurations. Then grade (`skill-creator` `agents/grader.md`; field names `text`/`passed`/`evidence`), aggregate with `skill-creator` `scripts/aggregate_benchmark`, and open the viewer with `--previous-workspace .../iteration-1`.

**Still worth adding:**

- A clean-diff `review-ls-changes` eval that measures false positives.
- A harder planted-defect set: subtle `targetSpecs` overlaps, carried-over fields missing from a version-scoped `allowed-fields`, wrong `apilintElementOrClass` element names.

**Description optimization** (`skill-creator` `scripts/run_loop`, `claude -p` × 3 per query per iteration) is deferred for the same reason. Start with `add-namespace` vs `add-spec-version`, whose descriptions used to overlap; `add-namespace` now defers end-to-end requests to `/add-spec-version`.
