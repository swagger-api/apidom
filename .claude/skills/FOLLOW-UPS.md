# Follow-ups from the Skills Restructuring Session (2026-10-14)

These items came up while splitting the spec skills, adding `/add-spec-version` and running the first evals. None were fixed in that session. Each section says what was found, how to check it is still true, and how to fix it.

Status legend: ⏳ open, ✅ done (add commit/PR reference).

---

## 1. ⏳ Decision: anchor format in OAS documentation URLs

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

**Decision needed.** Recommended: drop the "camelCase" rule and replace it with "use the anchor that exists in the spec markdown, verified with `verify-urls.mjs`". That rule survives future upstream reformatting.

**If accepted, change all of these together** (one commit, `docs:` or `chore(ls):`):

1. `CLAUDE.md`, "apidom-ls Documentation URL Requirements": replace the camelCase rule and the per-version anchor list.
2. `.claude/skills/update-ls-config/SKILL.md`, Critical Rule 7 and the final checklist item about camelCase anchors.
3. `.claude/skills/update-ls-config/references/completion-and-documentation.md`, the note at the top.
4. `.claude/skills/review-ls-changes/references/docs-completion-anchor-checks.md`, the anchor format table row for GitHub markdown.
5. Then fix the links themselves in a separate commit (`fix(ls): correct OpenAPI documentation anchors`): run the command above, rewrite each broken anchor to the one that exists, and re-run until 0 `BROKEN`.

**If rejected**, record why in `CLAUDE.md` so the next review doesn't re-raise it, and accept that those links land at the top of the page.

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

### 2.3 ⏳ AsyncAPI 3 `Server.description` redefines the parent getter

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

## 3. Session leftovers (cleanup)

| Item | Location | What to do |
|------|----------|------------|
| Eval viewer server | http://localhost:3117 (pid in `/tmp/eval-viewer.pid`) | Leave review feedback first if you want an eval round 2; then `kill $(cat /tmp/eval-viewer.pid)` |
| Eval workspace | `~/WebstormProjects/apidom-skills-workspace` (outside the repo) | Holds snapshots, eval outputs, graders (`graders/grade.py`) and ground-truth PR comments. Keep it for round 2; otherwise delete it after removing the worktrees |
| Git worktrees | `wt-review`, `wt-pre-oas32`, `wt-pre-asyncapi3-ls` in the workspace | Remove with the commands below |
| Branch | `eval/review-planted-defects` | Recreate any time from `main` + `.claude/skills/review-ls-changes/evals/planted-defects.patch` |
| Stale doc | `.claude/skills/SKILL-SUMMARY.md` | Out of date (describes a single 742-line skill file). Delete it or fold anything still useful into `.claude/skills/README.md` |

Cleanup commands (run from the repo root, after the viewer is no longer needed):

```bash
kill $(cat /tmp/eval-viewer.pid) 2>/dev/null
git worktree remove ../apidom-skills-workspace/wt-review
git worktree remove ../apidom-skills-workspace/wt-pre-oas32
git worktree remove ../apidom-skills-workspace/wt-pre-asyncapi3-ls
git branch -D eval/review-planted-defects
# optional, only if no eval round 2 is planned:
rm -rf ../apidom-skills-workspace
```

---

## 4. ⏳ Next eval round (optional)

Iteration 1 showed that the OAS 3.2 replays don't separate old and new skills, because `CLAUDE.md` and the skills already contain the PR #5110 answers. For a meaningful round 2:

- Use a spec version the skills have not seen (e.g. a newer Arazzo or AsyncAPI minor, or a synthetic "3.3" diff), so the field map can't be recalled from the instructions.
- Make the planted-defect review set harder: subtle `targetSpecs` overlaps, carried-over fields missing from a version-scoped `allowed-fields`, wrong `apilintElementOrClass` element names.
- Rerun with `skill-creator`, pass `--previous-workspace .../iteration-1` to the viewer, and compare.
