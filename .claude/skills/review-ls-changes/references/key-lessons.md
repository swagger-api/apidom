# Key Lessons

Lessons learned from production reviews of multiple specification namespaces. Each lesson describes a recurring mistake pattern to look for during the review.

### TOC Entries Are Not Fixed Fields Tables

Spec pages typically have a table of contents near the top listing section headings (e.g. `4.4.1. AgentCard`). These TOC entries appear earlier in the document than the actual object definitions and contain **no** field data. If you extract a section and the result does not contain the field rows with their required status (a `Yes`/`No` column, or the full description text for specs that use a `REQUIRED` marker), you have the TOC entry, not the actual table — fetch again by anchoring on the section heading. Never infer a field's required status from a TOC entry, a secondary source (proto file, JSON Schema), or prior knowledge. Always quote the raw table row as evidence before reporting a finding.

### Required Status Is Not Always a Separate Column
Some specs have a dedicated `Required` column (`Yes`/`No`); others (OpenAPI, AsyncAPI, Arazzo) put a `REQUIRED` marker at the start of the description and treat everything else as optional. Identify the format before building the field map, and never search for `Yes`/`No` in a spec that does not use them.

### Objects Without Their Own Definition Get No Required Rules
If an object is only referenced as a field type in a parent and has no definition of its own in the spec (no section, no field table), the required status of its fields cannot be verified. There should be no `--required.ts` rule for such fields — flag any that exist.

### Secondary Sources Can Contradict the Spec
Definition pages, proto files, and JSON schemas are secondary sources that can diverge from the specification page on required/optional designations. Always confirm against the specification page — it is the sole source of truth.

### OAuth-style Specs Systematically Miss `scopes--required.ts`
For all active (non-deprecated) OAuth flows, `scopes` is commonly marked required in the spec but `scopes--required.ts` is often absent. Check for this pattern when reviewing any OAuth-style spec.

### New Element Configs May Have No Required Rules
When element configs are added quickly (stubs), they often contain only `allowed-fields.ts`. Always cross-check each field against the spec to add required-field rules.

### Spec Page Truncation
`WebFetch` truncates long spec pages before reaching late sections. Always fall back to `curl | python3` extraction when `WebFetch` reports truncation.

### Required vs Optional Wording in Docs
The word "optional" in a `docs` string is factually wrong for a required field. Always match the spec's required/optional designation.

### URL Anchor Formats Differ Between Spec Pages
A spec site may have multiple pages (specification, definitions, reference) each using a different anchor format. Mixing them creates broken links. Pick one canonical page per element and use its actual anchor format consistently.

### Type Rules Are Systematically Missing in New Configs
When an element config is added quickly, it typically gets only `allowed-fields.ts` and `*--required.ts` rules. Type rules (`*--type.ts`) are almost always missing. For every required field check, ask: "Is there a paired type rule?"

### Completion Files Are Omitted in Quick Stubs
New element configs added as stubs often have no `completion.ts` at all, or export `never[]`. This silently disables IDE auto-complete for every field in that element. Check for this pattern for every registered config key.

### Discriminated Union Subtypes Need Separate Config Entries
When a spec defines a discriminated union (e.g. a `SecurityScheme` type with subtypes), each subtype **must have its own `config.ts` entry** using the subtype's element name as the key. A single entry for the union type is not enough — the subtypes' fields will have no lint/docs/completion coverage.

### New Fields on Existing Objects Are Systematically Missed When Extending a Parent Version
When a spec version adds new fields to existing objects (e.g. `prefixEncoding`, `itemEncoding` added to `Encoding`), those fields are routinely absent from `allowed-fields`, `documentation.ts`, `completion.ts`, AND lint rules. Always build a diff of new vs inherited fields per object and check all four coverage areas for each new field.

### Array-of-Objects Fields Need a Different Linter Function
A field that is an array of spec objects should use `apilintChildrenOfElementsOrClasses` (with the element class name), not `apilintType`. Using `apilintType` with `['array']` validates the container but not the element type of its members.

### Deprecated/Removed Objects May Still Have Config Dirs
If a spec removes an object in a new version, its config directory may persist in the implementation. Always check the spec changelog. If an older version that still defines the object is supported by the LS, **do not remove the config** — verify that its rules, documentation, and completion entries are scoped via `targetSpecs` to the versions where the object exists. Flag the directory for removal only if no supported version defines the object.

### Target Specs Must Be Updated in Both Directions
When a new version is added, existing entries for unchanged fields must gain the new version in `targetSpecs` (otherwise the new version gets no coverage), while entries for fields new in that version must target **only** the new version (otherwise they fire for older documents). Both mistakes are easy to miss because the rule files themselves look correct.

