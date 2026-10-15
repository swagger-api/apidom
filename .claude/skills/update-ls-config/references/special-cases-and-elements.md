# Special Cases and Common Elements Reference

Read this during **Phase 5** and **Phase 6** when the namespace introduces something beyond plain typed fields (new HTTP methods, dynamic collections, version-specific, hierarchical, global or self-reference fields, `$ref`-or-inline fields), or when deciding which baseline elements to cover.

## Special Features and Edge Cases

Based on OpenAPI 3.2.0 and other implementations, handle these special cases:

### 1. New HTTP Methods or Operations
When a specification adds new standard operations (like OpenAPI 3.2's QUERY):
- Add completion item with same structure as existing methods
- Add to PathItem allowed fields
- Create lint rule for type validation
- Update documentation with method-specific details

### 2. Dynamic Collections
For fields with arbitrary keys (additionalOperations, webhooks, components.mediaTypes):
- Create value completions for common patterns
- Document the key format/pattern
- Provide lint rules for value types
- Add documentation explaining the collection purpose

### 3. Version-Specific Fields
When adding fields not in parent version:
- Ensure targetSpecs correctly limits to this version
- Document what's new in the field description
- Add appropriate default values in quick fixes
- Create comprehensive lint coverage

### 4. Hierarchical Fields
For nested structures with multiple levels (like OpenAPI 3.2's tag hierarchical fields):
- Create completions for each nesting level
- Use conditions to show relevant properties
- Document the hierarchy structure
- Validate structure at each level

### 5. Global Configuration Fields
For fields affecting document-wide behavior (like jsonSchemaDialect):
- Provide documentation explaining scope of impact
- Include valid values as completions
- Link to related specification sections
- Validate format and allowed values

### 6. Self-Reference Fields
For fields like $self that establish document URI:
- Validate URI format
- Document purpose for relative reference resolution
- Provide examples in documentation

### 7. Reference vs Inline Content
For fields that accept either $ref or inline content:
- Provide completions for both patterns
- Document when to use each approach
- Validate structure for inline content
- Add lint rules for reference format

## Common Element Types to Include

For most specifications, generate configs for these common elements:

### Root Element
- Version field (e.g., `openapi`, `asyncapi`)
- Info object
- Servers array
- Security array
- Tags array
- External docs object

### Info Element
- title (required string)
- version (required string)
- description (optional string)
- termsOfService (optional string)
- contact (optional object)
- license (optional object)

### Server Element
- url (required string)
- description (optional string)
- variables (optional object)

### Contact Element
- name (optional string)
- url (optional string)
- email (optional string)

### License Element
- name (required string)
- url (optional string)
