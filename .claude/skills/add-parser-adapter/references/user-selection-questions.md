# User Selection Questions (Phase 2)

Exact `AskUserQuestion` payloads used in Phase 2 of the `add-parser-adapter` skill.

Present the missing adapters to the user using `AskUserQuestion`:

```typescript
{
  question: "Which namespace would you like to add parser adapters for?",
  header: "Namespace",
  multiSelect: false,
  options: [
    {
      label: "OpenAPI 3.2 (JSON + YAML)",
      description: "Creates apidom-parser-adapter-openapi-json-3-2 and apidom-parser-adapter-openapi-yaml-3-2"
    },
    {
      label: "JSON Schema 2019-09 (JSON + YAML)",
      description: "Creates apidom-parser-adapter-json-schema-json-2019-09 and apidom-parser-adapter-json-schema-yaml-2019-09"
    }
    // ... more options for each missing adapter
  ]
}
```

After selection, ask for additional information:

```typescript
{
  questions: [
    {
      question: "What is the specification version field name?",
      header: "Field Name",
      options: [
        { label: "openapi", description: "For OpenAPI specifications" },
        { label: "asyncapi", description: "For AsyncAPI specifications" },
        { label: "arazzo", description: "For Arazzo specifications" },
        { label: "Other", description: "Specify a custom field name" }
      ]
    },
    {
      question: "What is the version pattern?",
      header: "Version",
      options: [
        { label: "3.2.0", description: "Exact version (e.g., OpenAPI 3.2.0)" },
        { label: "3.2.x", description: "Minor version range (3.2.0, 3.2.1, etc.)" },
        { label: "Other", description: "Specify custom version pattern" }
      ]
    },
    {
      question: "What is the root specification element class name?",
      header: "Root Element",
      options: [
        { label: "From namespace exports", description: "Automatically discover from namespace package" }
      ]
    }
  ]
}
```
