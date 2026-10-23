# Tracking Document and Field Map Template

Copy into `ADD-{SPEC}-{VERSION}.md` at the repo root (not committed). Every later phase reads the field map instead of re-deriving fields from memory.

```markdown
# Add {Spec} {Version}

- Spec version: {x.y.z} (latest patch release on {date}; releases page: {URL})
- Changes page read: {what's new / changelog URL}
- Spec source: {raw markdown URL}
- Parent spec source: {raw markdown URL or "none"}
- Parent namespace: packages/apidom-ns-{parent}
- Packages: apidom-ns-{spec}-{version}, apidom-parser-adapter-{spec}-json-{version}, apidom-parser-adapter-{spec}-yaml-{version} (new variant), or the existing ones (extend variant)

## Phases

Variant: extend ({existing namespace}) / new

| Phase | Branch | PR | Gate result |
|-------|--------|----|-------------|
| Field map | - | - | user confirmed on {date} |
| 1 Namespace | feat/{spec}-{version}/phase-1 | #{n} (open/merged) | |
| 2 Parser adapters | feat/{spec}-{version}/phase-2 | | |
| 3 apidom-reference | feat/{spec}-{version}/phase-3 | | |
| 4 apidom-ls | feat/{spec}-{version}/phase-4 | | |

## Field map

Status values: NEW (not in parent), CHANGED-TYPE (exists in parent, type differs), REMOVED (in parent, gone now), INHERITED (unchanged; listed only to prove it was checked).

| Object | Field | Type | Required | Status | ns (P1) | refractor (P1) | empty-el (P1) | deref (P3) | completion (P4) | docs (P4) | lint (P4) |
|--------|-------|------|----------|--------|----|-----------|----------|-------|------------|------|------|
| Components | mediaTypes | Map[string, Media Type \| Reference] | no | NEW | | | | | | | |
| Components | pathItems | Map[string, Path Item] | no | INHERITED (3.1) | - | - | - | - | - | - | - |
| Encoding | prefixEncoding | [Encoding] | no | NEW | | | | | | | |
| Encoding | itemEncoding | Encoding | no | NEW | | | | | | | |
| OAuthFlow | deviceAuthorizationUrl | string (URL) | REQUIRED (deviceAuthorization flow) | NEW | | | | | | | |
| XML | nodeType | string, one of `element` \| `attribute` \| `text` \| `cdata` \| `none` | no | NEW | | | | | | | |

When the spec fixes a field's values or format, write them into the Type column, as in the last two
rows: Phase 4 turns them into `--equals` and `--format-*` lint rules.

Tick a column (✓) when the field is handled in that layer; `-` when not applicable
(e.g. `deref` only for fields that can hold a Reference or `$ref`, `empty-el` only for
object/array/element values).

## Objects

| Object | Status | Notes |
|--------|--------|-------|
| {New Object} | NEW | needs element, visitor, predicate, LS config dir |
| {Removed Object} | REMOVED | throwing getter / no LS config for this version |
| {Helper} (e.g. StringList NCE) | INTERNAL | namespace helper, not a spec object; no LS config (`--ignore` in check-ls-coverage) |

Every namespace element and LS config directory maps to exactly one row of this table.

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

- Start from the latest patch release and its changes page; removals (A2A 1.0 dropped the implicit and password OAuth flows) rarely show up in the tables.
- Take fields only from this version's Fixed Fields tables; the JSON Schema, examples and sibling specs add fields that don't exist (`AgentCard.url` in PR #5182). JSON Schema dialects have no Fixed Fields tables: build their keyword map per `json-schema-dialects.md`.
- Note fields named like ApiDOM element properties (`id`, `meta`, `content`, `attributes`, `classes`); they need renamed accessors (`idProp`).

- Read the parent spec's Fixed Fields table side by side with the new one; diff field names per object. Diffing the raw markdown of both versions (`diff <(grep '^| <a name' parent.md) <(grep '^| <a name' new.md)`) is a quick first pass, but always confirm in the tables because anchor naming can change between versions.
- Search the new spec for phrases like "added in", "new in", "deprecated", "removed" to find changes outside the tables.
- Check the parent namespace's element files: if ApiDOM already implemented a field in the parent namespace (e.g. `License.identifier`, `Info.summary` in OAS 3.1), it is `INHERITED` for the new version.
- Note the exact value shape: OAS 3.2 `prefixEncoding` is an array of Encoding Objects, `itemEncoding` a single Encoding Object, `encoding` a map. Visitor choice and `replace-empty-element` entries depend on it.
