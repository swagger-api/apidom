# Replace Empty Element Plugin

Every spec namespace ships `src/refractor/plugins/replace-empty-element.ts`, exported as `refractorPluginReplaceEmptyElement`. apidom-ls registers it for YAML documents (`parser-factory.ts`), so without it an empty YAML value such as

```yaml
name: agent example
capabilities:
```

refracts to a `StringElement` instead of `AgentCapabilitiesElement`, and completion, hover and lint for that object stop working while the user is typing. PR #5182 (A2A) shipped without the plugin and got four review comments for it.

## Template

Copy the plugin from a namespace with arrays and maps (`apidom-ns-a2a-1` or `apidom-ns-openapi-3-1`), keep `isEmptyElement`, `findElementFactory` and the `plugin` visitor unchanged, and rewrite only the header comment and `schema`.

`schema` maps the **parent element type** (the name `getNodeType` returns, e.g. `A2aAgentCard1Element`, or the first class of an NCE, e.g. `'agent-card-skills'`) to a factory per field:

```typescript
const schema = {
  // concrete types handling (CTs)
  A2aAgentCard1Element: {
    capabilities(...args: any[]) {
      return new AgentCapabilitiesElement(...args); // object-valued field
    },
    skills(...args: any[]) {
      return new SkillsElement(...args); // array-valued field (NCE)
    },
    defaultInputModes(...args: any[]) {
      return new ArrayElement(...args); // array of primitives
    },
    securitySchemes(...args: any[]) {
      return new SecuritySchemesElement(...args); // map-valued field
    },
  },
  // non-concrete types handling (NCEs)
  [SkillsElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new AgentSkillElement(...args); // items of an array
    },
  },
  [SecuritySchemesElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new SecuritySchemeElement(...args); // values of a map
    },
  },
};
```

## What must be in `schema`

Walk the field map and add an entry for **every** field whose value is not a plain scalar:

| Field value | Entry |
|-------------|-------|
| Object (e.g. Agent Capabilities) | `field: () => new {Object}Element(...)` on the parent |
| Array of objects | `field: () => new {Nce}Element(...)` on the parent, plus `'<*>'` on the NCE |
| Array of primitives | `field: () => new ArrayElement(...)` |
| Map of objects | `field: () => new {Nce}Element(...)` on the parent, plus `'[key: *]'` on the NCE |
| Free-form object | `field: () => new ObjectElement(...)` |
| Union / Reference-or-Object | the element the refractor picks when the value is empty (usually the concrete object) |

Elements with a version-specific variant (parent namespace) need entries for the new element types only; spread nothing from the parent plugin, since each namespace has its own copy.

## Wiring

- `src/index.ts`: `export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element.ts';`
- Header comment: the spec name and version the plugin covers (`A2A 1.0.x specification elements.`), and an example using this spec's root element.
- README: a "Replace Empty Element plugin" section under "Refractor plugins", copied from the sibling namespace README and adapted (example document, root element, both sexprs outputs).

## Tests

`test/refractor/plugins/replace-empty-element/` with snapshot tests. Copy the sibling's layout (`mappings.ts` for object fields, `sequences.ts` for array items, or a single `index.ts`), then cover:

- each object-valued field: `capabilities:` empty
- each array of objects, **including its items**: `skills:` followed by `  -` (expects `AgentSkillElement` inside the array)
- each map of objects, **including its values**: `securitySchemes:` / `  scheme1:` (expects `SecuritySchemeElement`)
- non-empty values stay untouched

Parse with `@swagger-api/apidom-parser-adapter-yaml-1-2` and refract with `{ plugins: [refractorPluginReplaceEmptyElement()] }`.
