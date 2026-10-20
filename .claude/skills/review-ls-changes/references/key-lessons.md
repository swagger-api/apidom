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

### Value Rules Are Systematically Missing in New Configs
When an element config is added quickly, it typically gets only `allowed-fields.ts` and `*--required.ts` rules; rules that check the value are almost always missing. For each field in `allowed-fields.ts`, required or optional, check for a `*--type.ts` rule, an `*--equals.ts` rule when the spec allows only a fixed set of values, and a `*--format-*.ts` rule when the spec requires a URI or email format (checks 4.5 and 4.6 in `lint-rule-checks.md`).

### Completion Files Are Omitted in Quick Stubs
New element configs added as stubs often have no `completion.ts` at all, or export `never[]`. This silently disables IDE auto-complete for every field in that element. Check for this pattern for every registered config key.

### Discriminated Union Subtypes Need Separate Config Entries
When a spec defines a discriminated union (e.g. a `SecurityScheme` type with subtypes), each subtype **must have its own `config.ts` entry** using the subtype's element name as the key. A single entry for the union type is not enough — the subtypes' fields will have no lint/docs/completion coverage.

### New Fields on Existing Objects Are Systematically Missed When Extending a Parent Version
When a spec version adds new fields to existing objects (e.g. `prefixEncoding`, `itemEncoding` added to `Encoding`), those fields are routinely absent from `allowed-fields`, `documentation.ts`, `completion.ts`, AND lint rules. Always build a diff of new vs inherited fields per object and check all four coverage areas for each new field.

### Array-of-Objects Fields Need a Different Linter Function
A field that is an array of spec objects should use `apilintArrayOfElementsOrClasses` with the element name (e.g. `[['agentSkill']]`), not `apilintType`. Using `apilintType` with `['array']` validates the container but not the element type of its members. Maps of spec objects use `apilintChildrenOfElementsOrClasses` instead; it returns `false` for anything that is not an object, so using it on an array field flags every valid array (see `services/validation/linter-functions.ts`).

### Deprecated/Removed Objects May Still Have Config Dirs
If a spec removes an object in a new version, its config directory may persist in the implementation. Always check the spec changelog. If an older version that still defines the object is supported by the LS, **do not remove the config** — verify that its rules, documentation, and completion entries are scoped via `targetSpecs` to the versions where the object exists. Flag the directory for removal only if no supported version defines the object.

### Prose-Only Changes Need Documentation Updates
A minor version can change meaning without touching a Fixed Fields table: AsyncAPI 3.1 added a note to Operation `messages` ("excluding this property ... implies that all messages from the channel will be included"), made the Server Object extensible in prose and listed 3.1.0 schema format media types. Diff the prose of both versions and check that `documentation.ts` and `completion.ts` follow it.

### Value Constraints Can Depend on Another Field
The ROS 2 operation binding allows `publisher`, `action_client`, `service_client` for `action: send` and the other three roles for `receive`. A rule with the six-value union is correct but incomplete; report the missing dependency, and quote any example in the source that contradicts the rule (the README's `Pose` example uses `receive` with `publisher`), so the user can decide whether to enforce it. The dependency can be checked even when the other field sits in a parent object: condition paths support `parent` segments (`parent.parent.action` from the binding), as `update-ls-config/references/lint-rules.md` shows; PR #5264 enforced it after review, following the field table over the example.

### Rules for Reference-able Fields Must Pass After Dereferencing
Dereferencing replaces a Reference element with the referenced element, so a rule that accepts only `reference` (or only the `referenced-element` value) reports every dereferenced document. Check that `linterParams` contains the element name (`server`) and, where the namespace sets a different `referenced-element` value (`channel-servers`), that value too. `'reference'` in `linterParams` is a finding of its own (check 4.8).

### A Type Rule Next to an Equals Rule Duplicates Diagnostics
`apilintValueOrArray` already fails for non-string values, so a `--type` rule (`apilintType`, `string`) on the same enum field reports the same value twice. Flag the `--type` rule; enum fields in existing bindings have only `--equals` (HTTP `method`, AMQP `is`).

### Messages Must Read as Diagnostics
Quoting the spec is not always right. Descriptive prose (ROS 2 message binding: "This object DOES NOT contain any ROS 2 specific properties") sounds like a complaint about missing properties; use the `MUST NOT contain any properties` wording of the other empty bindings. Likewise, a type message that names an object the namespace doesn't define (`must be a Quality of Service Policy Object`) should use the generic `value must be an object`.

### Fixtures Belong to the Test Kind
Completion fixtures under `test/fixtures/validation/` and one fixture per invalid field, when a shared `field-types` fixture already covers them, were both raised in the PR #5264 review. Check fixture locations and whether new single-field fixtures duplicate an existing one.

### A Key New in One Version Must Be Scoped Everywhere
A key the new version adds to a shared object (`ros2` in the bindings objects of AsyncAPI 3.1) needs version-scoped allowed-fields, type rule, completion item and documentation row. An object-level documentation entry shared by both versions that lists the new key advertises it to documents whose lint rejects it.

### Target Specs Must Be Updated in Both Directions
When a new version is added, existing entries for unchanged fields must gain the new version in `targetSpecs` (otherwise the new version gets no coverage), while entries for fields new in that version must target **only** the new version (otherwise they fire for older documents). Both mistakes are easy to miss because the rule files themselves look correct.

