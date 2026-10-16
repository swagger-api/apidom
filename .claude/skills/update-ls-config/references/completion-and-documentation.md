# Completion and Documentation Config Reference

Read this during **Phase 5** when generating `completion.ts` (step 5.2) and `documentation.ts` (step 5.3) for `packages/apidom-ls/src/config/{spec}/{version}/`, and in **Phase 6** when adding element-level completion/documentation.

> For OpenAPI 3.2+ documentation links, use the GitHub `3.2.0.md` URL with an anchor that exists in that markdown (SKILL.md Critical Rule 7), e.g. `https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#info-object`. Example links below are illustrative only; verify every anchor.

## Documentation URLs per Spec

Link to the page and anchor that exist in the spec's canonical rendering. Copy the anchor from the page source (`id="..."`), never derive it from the object name, and run `verify-urls.mjs` on the config directory: a missing anchor on markdown sources and on static HTML pages is reported `BROKEN`.

| Spec | Page | Anchor form | Example |
|------|------|-------------|---------|
| OpenAPI 3.0.x | `https://spec.openapis.org/oas/v3.0.4.html` | kebab-case | `#info-object` |
| OpenAPI 3.1.x | `https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md` | mixed: object headings kebab-case, field anchors camelCase | `#info-object`, `#oasInfo` |
| OpenAPI 3.2.x | `https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md` | kebab-case for object headings and field anchors | `#info-object`, `#oas-info` |
| AsyncAPI 2.x / 3.x | `https://www.asyncapi.com/docs/reference/specification/v{x.y.z}` | the spec markdown's `<a name>` anchors: camelCase object names and fields. The v3.x pages render them server-side, so `verify-urls` checks them (missing anchor is `BROKEN`); the v2.6.0 page renders them client-side (`UNVERIFIED`; check in a browser) | `#channelObject`, `#operationObjectMessages` |
| AsyncAPI bindings | `https://github.com/asyncapi/bindings/blob/master/{binding}/README.md` (SNS: `sns/2.x.x/README.md` for AsyncAPI 2, `sns/3.0.0/README.md` for 3) | the README's `<a name>` anchors or heading slugs. Link the README file, not the directory (`bindings/blob/master/kafka#server`): a directory without a README has no anchors | `#server-binding-object`, `#server` |
| A2A 1.x | `https://a2a-protocol.org/latest/specification/` (not `/latest/definitions/`) | section number + lowercase object name | `#443-agentcapabilities`, `#452-apikeysecurityscheme` |

A new spec gets a row here before its LS config is written. Each element's `documentation.ts` file comment links its object the same way (`See [AgentCapabilities](https://a2a-protocol.org/latest/specification/#443-agentcapabilities).`).


#### 5.2 Generate completion.ts

Each `completion.ts` lists the completion items for **one** object: the root version directory covers the root object's fields, and every element directory (`config/openapi/info/completion.ts`, `config/a2a/agent-skill/completion.ts`) covers that element's fields.

**How items are selected** (`getMetadataPropertyCompletions` in `packages/apidom-ls/src/services/completion/completion-service.ts`):

1. When the cursor is inside an object, the service looks up the config registered under that element's name (and its classes) in `config/{spec}/config.ts` and offers the items that have **no** `target`. This is what puts `title` inside `info` and `url` inside a server; no condition is needed for it.
2. When the cursor is at the value of a field, the service offers the items of the containing element whose `target` equals that field name. These are value completions, such as the allowed values of a parameter's `in`. Add `arrayMember: true` when the values are entries of an array field.
3. Items are then filtered by `targetSpecs` (namespace and exact version) and by `conditions`, if any.

**Field item** (from `config/openapi/openapi3_2/completion.ts`):

```typescript
import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { OpenAPI32 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'jsonSchemaDialect',
    insertText: 'jsonSchemaDialect',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The default value for the `$schema` keyword within [Schema Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#schema-object) contained within this OAS document. This MUST be in the form of a URI.',
    },
    targetSpecs: OpenAPI32,
  },
  // ... one item per field of this object
];

export default completion;
```

The `label` must be the exact field name: `check-ls-coverage.mjs` matches fields to items by label and reports `NO-COMPL` otherwise.

**Value completion** (from `config/openapi/parameter/completion.ts`):

```typescript
  {
    target: 'in',
    label: 'query',
    insertText: 'query',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
```

**Value completion that depends on another field** (from `config/asyncapi/server/completion.ts`): `conditions` run against the containing object, and `targets` paths are resolved from it (`'root'`, `'parent'` or a field name):

```typescript
  {
    target: 'protocolVersion',
    label: '2.8.1',
    // ...
    conditions: [
      {
        targets: [{ path: 'protocol' }],
        function: 'apilintContainsValue',
        params: ['kafka'],
      },
    ],
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
```

> **Condition functions must exist.** The `function` of a condition is looked up by name among the standard linter functions in `packages/apidom-ls/src/services/validation/linter-functions.ts` (e.g. `apilintContainsValue`, `missingField`, `existFields`), then among custom `linterFunctions` passed in the language service metadata (empty in the default config). `checkConditions` in `packages/apidom-ls/src/utils/utils.ts` silently skips a condition whose function it can't find, so an invented name such as `isInsideAgentSkill` makes the condition pass and the item appears everywhere the config applies. `config/a2a/a2a1/completion.ts` currently contains such names; don't copy them. Before using a condition, `grep -n "functionName: '{name}'"` in `linter-functions.ts`.

**Coverage**: one property item per field of each object, in that object's own `completion.ts`, plus value items for fields with a fixed set of values. When adding a version to an existing spec, add items only for fields that are new in that version, scoped to it, and widen the `targetSpecs` of unchanged items. Fields that are genuinely new in OpenAPI 3.2 (as opposed to 3.1 additions such as `jsonSchemaDialect`, `webhooks`, Info `summary` or License `identifier`) include:

- OpenAPI Object: `$self`
- Path Item: `query`, `additionalOperations`
- Components: `mediaTypes`
- Server: `name`
- Media Type: `itemSchema`, `prefixEncoding`, `itemEncoding`
- Tag: `summary`, `parent`, `kind`
- XML: `nodeType`
- OAuth Flows: `deviceAuthorization`; OAuth Flow: `deviceAuthorizationUrl`

Build this list from the field map in `/add-spec-version`, not from memory.

### Completion Format Mapping

| Field value | `format` | Example |
|---|---|---|
| String | `QUOTED` | `jsonSchemaDialect` |
| Number, boolean | `UNQUOTED` | parameter `required`, `deprecated` |
| Object or map | `OBJECT` | `info`, `webhooks` |
| Array | `ARRAY` | `servers`, `tags`, A2A `defaultInputModes` |

Other formats exist in `CompletionFormat` (`apidom-language-types.ts`), such as `ARRAY_OBJECT`, `QUOTED_FORCED` and `PARTIAL_KEY_QUOTED`; use them only where a neighbouring item of the same kind does.

**Documentation Best Practices**:
- Link directly to specification section (e.g., `[Documentation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#info-object)`)
- Include brief description from spec
- Mention if field is required or optional
- Note any constraints or formats
- Reference related fields

#### 5.3 Generate documentation.ts

This file provides hover documentation for the fields of one object, plus one entry without `target` for the object itself (the object-level entry shown when hovering the object's key in its parent).

**Every field gets documentation.** The one exception: a field whose value is a single spec object with its own element directory may be omitted, because hovering it shows that element's object-level entry. List such omitted fields in the header comment. From `config/openapi/openapi3_2/documentation.ts`:

```typescript
import { OpenAPI32 } from '../target-specs.ts';

/**
 * Omitted fixed fields:
 *  - info
 *  - paths
 *  - components
 *  - externalDocs
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */

const documentation = [
  {
    target: 'jsonSchemaDialect',
    docs: 'The default value for the `$schema` keyword within [Schema Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#schema-object) contained within this OAS document. This MUST be in the form of a URI.',
    targetSpecs: OpenAPI32,
  },
  // ... one entry per field that is not listed above
];

export default documentation;
```

`config/openapi/info/documentation.ts` omits `contact` and `license` the same way. Scalars (strings, booleans, numbers), arrays, maps and union-typed fields are never omitted: they have no element config of their own to fall back on. `check-ls-coverage.mjs` follows the same convention: it doesn't report `NO-DOCS` for a field whose type is a single element with its own object-level documentation.

**Steps:**
1. For each field of the object, add an entry with `target: '{field}'`, unless it is an object-valued field covered by its own element directory (list it in the header comment).
2. Add the object-level entry without `target` in the object's own element directory.
3. Link to the specification with the URL form from "Documentation URLs per Spec" above, and check the links with `verify-urls.mjs`.
