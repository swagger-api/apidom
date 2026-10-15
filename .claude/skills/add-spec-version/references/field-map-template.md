# Tracking Document and Field Map Template

Copy into `ADD-{SPEC}-{VERSION}.md` at the repo root (not committed). Every later stage reads the field map instead of re-deriving fields from memory.

```markdown
# Add {Spec} {Version}

- Spec source: {raw markdown URL}
- Parent spec source: {raw markdown URL or "none"}
- Parent namespace: packages/apidom-ns-{parent}
- New packages: apidom-ns-{spec}-{version}, apidom-parser-adapter-{spec}-json-{version}, apidom-parser-adapter-{spec}-yaml-{version}

## Stage status

| Stage | Status | Gate result |
|-------|--------|-------------|
| 0 Field map | done / in progress | user confirmed on {date} |
| 1 Namespace | | |
| 2 Parser adapters + reference | | |
| 3 Language service | | |
| 4 Spec review | | |
| 5 Wiring + full verification | | |

## Field map

Status values: NEW (not in parent), CHANGED-TYPE (exists in parent, type differs), REMOVED (in parent, gone now), INHERITED (unchanged; listed only to prove it was checked).

| Object | Field | Type | Required | Status | ns | refractor | empty-el | deref | completion | docs | lint |
|--------|-------|------|----------|--------|----|-----------|----------|-------|------------|------|------|
| Components | mediaTypes | Map[string, Media Type \| Reference] | no | NEW | | | | | | | |
| Components | pathItems | Map[string, Path Item] | no | INHERITED (3.1) | - | - | - | - | - | - | - |
| Encoding | prefixEncoding | [Encoding] | no | NEW | | | | | | | |
| Encoding | itemEncoding | Encoding | no | NEW | | | | | | | |
| OAuthFlow | deviceAuthorizationUrl | string | REQUIRED (deviceAuthorization flow) | NEW | | | | | | | |

Tick a column (✓) when the field is handled in that layer; `-` when not applicable
(e.g. `deref` only for fields that can hold a Reference or `$ref`, `empty-el` only for
object/array/element values).

## Objects

| Object | Status | Notes |
|--------|--------|-------|
| {New Object} | NEW | needs element, visitor, predicate, LS config dir |
| {Removed Object} | REMOVED | throwing getter / no LS config for this version |

## URLs

| Purpose | URL | verify-urls |
|---------|-----|-------------|
| JSON Schema dialect | | |
| Meta-schema | | |
| Docs base | | |

## Gate log

- {date} Gate 1: check-redefined-fields → `0 redefined, N overrides`; verify-urls → `0 broken`
```

## Tips for Building the Map

- Read the parent spec's Fixed Fields table side by side with the new one; diff field names per object. Diffing the raw markdown of both versions (`diff <(grep '^| <a name' parent.md) <(grep '^| <a name' new.md)`) is a quick first pass, but always confirm in the tables because anchor naming can change between versions.
- Search the new spec for phrases like "added in", "new in", "deprecated", "removed" to find changes outside the tables.
- Check the parent namespace's element files: if ApiDOM already implemented a field in the parent namespace (e.g. `License.identifier`, `Info.summary` in OAS 3.1), it is `INHERITED` for the new version.
- Note the exact value shape: OAS 3.2 `prefixEncoding` is an array of Encoding Objects, `itemEncoding` a single Encoding Object, `encoding` a map. Visitor choice and `replace-empty-element` entries depend on it.
