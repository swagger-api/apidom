// eslint-disable-next-line import/prefer-default-export
export const openapi31TypeSchema: string =
  'spec: OpenAPI 3.1\n' +
  'specUrl: https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md\n' +
  'root: OpenAPI 3.1 Object\n' +
  'types:\n' +
  '- name: OpenAPI 3.1 Object\n' +
  '  children:\n' +
  '  - name: openapi\n' +
  '    type: string\n' +
  '    constraints: [required]\n' +
  '    valueHint: "3.1.0"\n' +
  '  - name: info\n' +
  '    constraints: [required]\n' +
  '    type: Info Object\n' +
  '  - name: servers\n' +
  '    collection: list\n' +
  '    type: Server Object\n' +
  '  - name: security\n' +
  '    type: Security Requirement Object\n' +
  '    collection: list\n' +
  '  - name: tags\n' +
  '    collection: list\n' +
  '    type: Tag Object\n' +
  '  - name: externalDocs\n' +
  '    type: External Documentation Object\n' +
  '  - name: jsonSchemaDialect\n' +
  '    type: string\n' +
  '    valueHint: https://json-schema.org/draft/2020-12/schema\n' +
  '  - name: paths\n' +
  '    type: Paths Object\n' +
  '  - name: webhooks\n' +
  '    type: Webhook Object \n' +
  '  - name: components\n' +
  '    type: Components Object\n' +
  '\n' +
  '- name: Webhook Object\n' +
  '  children:\n' +
  "    - name: 'name'\n" +
  '      isPatternField: true\n' +
  '      type: [Path Item Object, Reference Object]\n' +
  '\n' +
  '- name: Info Object\n' +
  '  children:\n' +
  '  - name: title\n' +
  '    type: string\n' +
  '    constraints: [required]\n' +
  '    valueHint: "...text"\n' +
  '  - name: summary\n' +
  '    type: string\n' +
  '    valueHint: "...text"\n' +
  '  - name: description\n' +
  '    type: string\n' +
  '    valueHint: "...MarkDown"\n' +
  '  - name: termsOfService\n' +
  '    type: string\n' +
  '    valueHint: https://example.com\n' +
  '  - name: contact\n' +
  '    type: Contact Object\n' +
  '  - name: license\n' +
  '    type: License Object\n' +
  '  - name: version\n' +
  '    type: string\n' +
  '    constraints: [required]\n' +
  '    valueHint: 1.2.3\n' +
  '\n' +
  '- name: Contact Object\n' +
  '  children:\n' +
  '    - name: name\n' +
  '      type: string\n' +
  "      valueHint: '...text'\n" +
  '    - name: url\n' +
  '      type: string\n' +
  "      valueHint: '...url'\n" +
  '    - name: email\n' +
  '      type: string\n' +
  "      valueHint: '...email'\n" +
  '\n' +
  '\n' +
  '- name: License Object\n' +
  '  children:\n' +
  '    - name: name\n' +
  '      type: string\n' +
  '      constraints: [required]\n' +
  "      valueHint: '...text'\n" +
  '    - name: identifier\n' +
  '      type: string\n' +
  "      valueHint: '...SPDX'\n" +
  '    - name: url\n' +
  '      type: string\n' +
  "      valueHint: '...url'\n" +
  '\n' +
  '- name: Server Object\n' +
  '  children:\n' +
  '    - name: url\n' +
  '      type: string\n' +
  "      valueHint: '...url'\n" +
  '    - name: description\n' +
  '      type: string\n' +
  "      valueHint: '...MarkDown'\n" +
  '    - name: variables\n' +
  '      type: Server Variable Mapping\n' +
  '\n' +
  '- name: Server Variable Mapping\n' +
  '  children:\n' +
  '    - name: name\n' +
  '      isPatternField: true\n' +
  '      type: Server Variable Object\n' +
  '\n' +
  '- name: Server Variable Object\n' +
  '  children:\n' +
  '    - name: enum\n' +
  '      type: string\n' +
  '      collection: list\n' +
  "      valueHint: '[var1, var2]'\n" +
  '    - name: default\n' +
  '      type: string\n' +
  "      valueHint: '...text'\n" +
  '    - name: description\n' +
  '      type: string\n' +
  "      valueHint: '...MarkDown'\n" +
  '\n' +
  '- name: Schemas Mapping\n' +
  '  children:\n' +
  '    - name: name\n' +
  '      isPatternField: true\n' +
  '      type: Schema Object\n' +
  '\n' +
  '- name: Responses Mapping\n' +
  '  children:\n' +
  '    - name: name\n' +
  '      isPatternField: true\n' +
  '      type: [Response Object, Reference With Description Object]\n' +
  '\n' +
  '- name: Parameters Mapping\n' +
  '  children:\n' +
  '    - name: name\n' +
  '      isPatternField: true\n' +
  '      type: [Parameter Object, Reference With Description Object]\n' +
  '\n' +
  '- name: Examples Mapping\n' +
  '  children:\n' +
  '    - name: name\n' +
  '      isPatternField: true\n' +
  '      type: [Example Object, Reference Object]\n' +
  '\n' +
  '- name: Request Body Mapping\n' +
  '  children:\n' +
  '    - name: name\n' +
  '      isPatternField: true\n' +
  '      type: [Request Body Object, Reference Object]\n' +
  '\n' +
  '- name: Headers Mapping\n' +
  '  children:\n' +
  '    - name: name\n' +
  '      isPatternField: true\n' +
  '      type: [Header Object, Reference With Description Object]\n' +
  '\n' +
  '- name: Security Scheme Mapping\n' +
  '  children:\n' +
  '    - name: name\n' +
  '      isPatternField: true\n' +
  '      type: [Security Scheme Object, Reference With Description Object]\n' +
  '\n' +
  '- name: Links Mapping\n' +
  '  children:\n' +
  '    - name: name\n' +
  '      isPatternField: true\n' +
  '      type: [Link Object, Reference With Description Object]\n' +
  '\n' +
  '- name: Callbacks Mapping\n' +
  '  children:\n' +
  '    - name: name\n' +
  '      isPatternField: true\n' +
  '      type: [Callback Object, Reference Plain Object]\n' +
  '\n' +
  '- name: Path Items Mapping\n' +
  '  children:\n' +
  '    - name: name\n' +
  '      isPatternField: true\n' +
  '      type: [Path Item Object, Reference Object]\n' +
  '\n' +
  '- name: Components Object\n' +
  '  children:\n' +
  '    - name: schemas\n' +
  '      type: Schemas Mapping\n' +
  '    - name: responses\n' +
  '      type: Responses Mapping\n' +
  '    - name: parameters\n' +
  '      type: Parameters Mapping\n' +
  '    - name: examples\n' +
  '      type: Examples Mapping\n' +
  '    - name: requestBodies\n' +
  '      type: Request Body Mapping\n' +
  '    - name: headers\n' +
  '      type: Headers Mapping\n' +
  '    - name: securitySchemes\n' +
  '      type: Security Scheme Mapping \n' +
  '    - name: links\n' +
  '      type: Links Mapping \n' +
  '    - name: callbacks\n' +
  '      type: Callbacks Mapping\n' +
  '    - name: pathItems\n' +
  '      type: Path Items Mapping\n' +
  '\n' +
  '- name: Paths Object\n' +
  '  children:\n' +
  "    - name: 'path'\n" +
  '      isPatternField: true\n' +
  "      keyHint: '/(path)'\n" +
  '      type: Path Item Object\n' +
  '\n' +
  '- name: Path Item Object\n' +
  '  children:\n' +
  '    - name: $ref\n' +
  '      type: string\n' +
  "      valueHint: '...$ref'\n" +
  '    - name: summary\n' +
  '      type: string\n' +
  "      valueHint: '...text'\n" +
  '    - name: description\n' +
  '      type: string\n' +
  "      valueHint: '...markdown'\n" +
  '    - name: method\n' +
  "      keyHint: '(get|post|...)'\n" +
  '      type: Operation Object\n' +
  '      isPatternField: true\n' +
  '    # - name: get\n' +
  '    #   type: Operation Object\n' +
  '    # - name: put\n' +
  '    #   type: Operation Object\n' +
  '    # - name: post\n' +
  '    #   type: Operation Object\n' +
  '    # - name: delete\n' +
  '    #   type: Operation Object\n' +
  '    # - name: options\n' +
  '    #   type: Operation Object\n' +
  '    # - name: head\n' +
  '    #   type: Operation Object\n' +
  '    # - name: patch\n' +
  '    #   type: Operation Object\n' +
  '    # - name: trace\n' +
  '    #   type: Operation Object\n' +
  '    - name: servers\n' +
  '      collection: list\n' +
  '      type: Server Object\n' +
  '    - name: parameters\n' +
  '      collection: list\n' +
  '      type: [Parameter Object, Reference Object]\n' +
  '\n' +
  '- name: Operation Object\n' +
  '  children:\n' +
  '    - name: tags\n' +
  '      collection: list\n' +
  '      type: string\n' +
  "      valueHint: '[one, two]'\n" +
  '    - name: summary\n' +
  '      type: string\n' +
  "      valueHint: '...text'\n" +
  '    - name: description\n' +
  '      type: string\n' +
  "      valueHint: '...MarkDown'\n" +
  '    - name: externalDocs\n' +
  '      type: External Documentation Object\n' +
  '    - name: operationId\n' +
  '      type: string\n' +
  "      valueHint: '...text'\n" +
  '    - name: parameters\n' +
  '      collection: list\n' +
  '      type: [Parameter Object, Reference Object]\n' +
  '    - name: requestBody\n' +
  '      type: [Request Body Object, Reference Object]\n' +
  '    - name: responses\n' +
  '      type: Responses Object\n' +
  '    - name: callbacks\n' +
  '      type: [Callback Object, Reference Object]\n' +
  '    - name: deprecated\n' +
  '      type: boolean\n' +
  '    - name: security\n' +
  '      collection: list\n' +
  '      type: Security Requirement Object\n' +
  '\n' +
  '- name: Reference Plain Object\n' +
  '  children:\n' +
  '    - name: $ref\n' +
  '      type: string\n' +
  '      valueHint: "...$ref"\n' +
  '\n' +
  '- name: Reference With Description Object\n' +
  '  children:\n' +
  '    - name: $ref\n' +
  '      type: string\n' +
  '      valueHint: "...$ref"\n' +
  '    - name: description\n' +
  '      type: string\n' +
  '      valueHint: "...MarkDown"\n' +
  '\n' +
  '- name: Reference Object\n' +
  '  children:\n' +
  '    - name: $ref\n' +
  '      type: string\n' +
  '      valueHint: "...$ref"\n' +
  '    - name: summary\n' +
  '      type: string\n' +
  '      valueHint: "...text"\n' +
  '    - name: description\n' +
  '      type: string\n' +
  '      valueHint: "...MarkDown"\n' +
  '\n' +
  '- name: External Documentation Object\n' +
  '  children:\n' +
  '    - name: description\n' +
  '      type: string\n' +
  "      valueHint: '...MarkDown'\n" +
  '    - name: url\n' +
  '      type: string\n' +
  '      constraints: [required]\n' +
  "      valueHint: '...url'\n" +
  '\n' +
  '- name: Parameter Object\n' +
  '  children:\n' +
  '    - name: name\n' +
  '      type: string\n' +
  '      constraints: [required]\n' +
  "      valueHint: '...text'\n" +
  '    - name: in\n' +
  '      type: string\n' +
  '      constraints: [required]\n' +
  "      valueHint: 'query|header|path|cookie'\n" +
  '    - name: description\n' +
  '      type: string\n' +
  "      valueHint: '...MarkDown'\n" +
  '    - name: required\n' +
  '      type: boolean\n' +
  '    - name: deprecated\n' +
  '      type: boolean\n' +
  '    - name: allowEmptyValue\n' +
  '      type: boolean\n' +
  '    - name: style\n' +
  '      type: string\n' +
  "      valueHint: '...style'\n" +
  '    - name: explode\n' +
  '      type: boolean\n' +
  '    - name: allowReserved\n' +
  '      type: boolean\n' +
  '    - name: schema\n' +
  '      type: Schema Object\n' +
  '    - name: example\n' +
  '      type: any\n' +
  '    - name: examples\n' +
  '      type: Examples Object\n' +
  '    - name: content\n' +
  '      type: Media Types Object\n' +
  '\n' +
  '- name: Media Types Object\n' +
  '  children:\n' +
  '    - name: mediaType\n' +
  "      keyHint: '(application/json)'\n" +
  '      type: Media Type Object\n' +
  '      isPatternField: true\n' +
  '\n' +
  '- name: Request Body Object\n' +
  '  children:\n' +
  '    - name: description\n' +
  '      type: string\n' +
  "      valueHint: '...MarkDown'\n" +
  '    - name: content\n' +
  '      type: Media Types Object\n' +
  '    - name: required\n' +
  '      type: boolean\n' +
  '\n' +
  '- name: Media Type Object\n' +
  '  children:\n' +
  '    - name: schema\n' +
  '      type: Schema Object\n' +
  '    - name: example\n' +
  '      type: any\n' +
  '    - name: examples\n' +
  '      type: Examples Object\n' +
  '    - name: encoding\n' +
  '      type: Encodings Object\n' +
  '\n' +
  '- name: Encodings Object\n' +
  '  children:\n' +
  '    - name: "propertyName"\n' +
  '      isPatternField: true\n' +
  '      type: Encoding Object\n' +
  '- name: Encoding Object\n' +
  '  children:\n' +
  '    - name: contentType\n' +
  '      type: string\n' +
  "      valueHint: '...media type'\n" +
  '    - name: headers\n' +
  '      type: [Header Object, Reference Object]\n' +
  '      isPatternField: true\n' +
  '    - name: style\n' +
  '      type: string\n' +
  "      valueHint: '...style'\n" +
  '    - name: explode\n' +
  '      type: boolean\n' +
  '    - name: allowReserved\n' +
  '      type: boolean\n' +
  '  \n' +
  '\n' +
  '- name: Responses Object\n' +
  '  children:\n' +
  '    - name: default\n' +
  '      type: [Response Object, Reference With Description Object]\n' +
  "    - name: 'statusCode'\n" +
  "      keyHint: '(200|404|...)'\n" +
  '      isPatternField: true\n' +
  '      type: [Response Object, Reference With Description Object]\n' +
  '  \n' +
  '- name: Response Object\n' +
  '  children:\n' +
  '    - name: description\n' +
  '      type: string\n' +
  "      valueHint: '...MarkDown'\n" +
  '    - name: headers\n' +
  '      type: [Header Object, Reference Object]\n' +
  '    - name: content\n' +
  '      type: [Media Types Object, Reference Object]\n' +
  '    - name: links\n' +
  '      type: [Link Object, Reference Object]\n' +
  '\n' +
  '- name: Callback Object\n' +
  '  children:\n' +
  "    - name: 'expression'\n" +
  "      keyHint: '{expression}'\n" +
  '      isPatternField: true\n' +
  '      type: [Path Item Object, Reference Object]\n' +
  '\n' +
  '- name: Examples Object\n' +
  '  children:\n' +
  "    - name: 'name'\n" +
  '      type: [Example Object, Reference Object]\n' +
  '      isPatternField: true\n' +
  '\n' +
  '\n' +
  '- name: Example Object\n' +
  '  children:\n' +
  '    - name: summary\n' +
  '      type: string\n' +
  '      valueHint: "...text"\n' +
  '    - name: description\n' +
  '      type: string\n' +
  '      valueHint: "...MarkDown"\n' +
  '    - name: value\n' +
  '      type: any\n' +
  '      valueHint: "Anything"\n' +
  '    - name: externalValue\n' +
  '      type: string\n' +
  '      valueHint: "...URI"\n' +
  '\n' +
  '- name: Link Object\n' +
  '  children:\n' +
  '    - name: description\n' +
  '      type: string\n' +
  '      valueHint: "...MarkDown"\n' +
  '    - name: server\n' +
  '      type: Server Object\n' +
  '    - name: operationRef\n' +
  '      type: string\n' +
  '      valueHint: "...$ref"\n' +
  '    - name: operationId\n' +
  '      type: string\n' +
  '      valueHint: "...operationId"\n' +
  '    - name: parameters\n' +
  '      type: Parameter Link Object\n' +
  '    - name: requestBody\n' +
  '      type: string\n' +
  "      valueHint: '{expression}'\n" +
  '\n' +
  '- name: Parameter Link Object\n' +
  '  children:\n' +
  '    - name: paramName\n' +
  '      type: string\n' +
  '      isPatternField: true\n' +
  "      valueHint: '{expression}'\n" +
  '\n' +
  '- name: Headers Object\n' +
  '  children:\n' +
  "    - name: 'Header-Name'\n" +
  '      type: Header Object\n' +
  '\n' +
  '- name: Header Object\n' +
  '  children:\n' +
  '    - name: description\n' +
  '      type: string\n' +
  "      valueHint: '...MarkDown'\n" +
  '    - name: required\n' +
  '      type: boolean\n' +
  '    - name: deprecated\n' +
  '      type: boolean\n' +
  '    - name: allowEmptyValue\n' +
  '      type: boolean\n' +
  '    - name: style\n' +
  '      type: string\n' +
  "      valueHint: '...style'\n" +
  '    - name: explode\n' +
  '      type: boolean\n' +
  '    - name: allowReserved\n' +
  '      type: boolean\n' +
  '    - name: schema\n' +
  '      type: Schema Object\n' +
  '    - name: example\n' +
  '      type: any\n' +
  '    - name: examples\n' +
  '      type: Examples Mapping\n' +
  '    - name: content\n' +
  '      type: Media Types Object\n' +
  '\n' +
  '- name: Tab Object\n' +
  '  children:\n' +
  '  - name: name\n' +
  '    type: string\n' +
  "    valueHint: 'Pet'\n" +
  '  - name: description\n' +
  '    type: string\n' +
  "    valueHint: '...MarkDown'\n" +
  '  - name: externalDocs\n' +
  '    type: string\n' +
  "    valueHint: '...URI'\n" +
  '\n' +
  '- name: Schema Object\n' +
  '  children:\n' +
  '\n' +
  '  # ----------\n' +
  '  # Core vocabulary\n' +
  '  # ----------\n' +
  '  - name: $id\n' +
  '    type: string\n' +
  "    valueHint: '...URI'\n" +
  '  - name: $schema\n' +
  '    type: string\n' +
  "    valueHint: '...URI'\n" +
  '  - name: $ref\n' +
  '    type: string\n' +
  "    valueHint: '...URI'\n" +
  '  - name: $anchor\n' +
  '    type: string\n' +
  "    valueHint: 'someName'\n" +
  '  - name: $dynamicAnchor\n' +
  '    type: string\n' +
  "    valueHint: 'someName'\n" +
  '  - name: $vocabulary\n' +
  '    type: Vocabulary Mapping\n' +
  '  - name: $comment\n' +
  '    type: string\n' +
  '    valueHint: Some comment\n' +
  '  - name: $defs\n' +
  '    type: Defs Mapping\n' +
  '\n' +
  '  # ----------\n' +
  '  # Meta-data vocabulary\n' +
  '  # ----------\n' +
  '  - name: title\n' +
  '    type: string\n' +
  '    valueHint: Some Name\n' +
  '  - name: description\n' +
  '    type: string\n' +
  '    valueHint: ...description\n' +
  '  - name: default\n' +
  '    type: any\n' +
  '  - name: deprecated\n' +
  '    type: boolean\n' +
  "    valueHint: 'true'\n" +
  '  - name: readOnly\n' +
  '    type: boolean\n' +
  "    valueHint: 'true'\n" +
  '  - name: writeOnly\n' +
  '    type: boolean\n' +
  "    valueHint: 'true'\n" +
  '  - name: examples\n' +
  '    type: any\n' +
  '    collection: list\n' +
  "    valueHint: '[...any]'\n" +
  '\n' +
  '  # ----------\n' +
  '  # Validation vocabulary\n' +
  '  # ----------\n' +
  '\n' +
  '  - name: type\n' +
  '    type: string\n' +
  '    collection: list\n' +
  "    valueHint: 'string|number|[number, boolean]'\n" +
  '  - name: const\n' +
  '    type: any\n' +
  "    valueHint: 'Foo Bar'\n" +
  '  - name: enum\n' +
  '    type: any\n' +
  '    collection: list\n' +
  "    valueHint: '[one, two]'\n" +
  '  - name: multipleOf\n' +
  '    type: number\n' +
  '    valueHint: 10\n' +
  '  - name: maximum\n' +
  '    type: number\n' +
  '    valueHint: 99\n' +
  '  - name: exclusiveMaximum\n' +
  '    type: number\n' +
  '    valueHint: 100\n' +
  '  - name: minimum\n' +
  '    type: number\n' +
  '    valueHint: 1\n' +
  '  - name: exclusiveMinimum\n' +
  '    type: number\n' +
  '    valueHint: 0\n' +
  '  - name: maxLength\n' +
  '    type: number\n' +
  '    valueHint: 7\n' +
  '  - name: minLength\n' +
  '    type: number\n' +
  '    valueHint: 1\n' +
  '  - name: pattern\n' +
  '    type: string\n' +
  "    valueHint: '/^foo-.*/'\n" +
  '  - name: maxItems\n' +
  '    type: number\n' +
  '    valueHint: 7\n' +
  '  - name: minItems\n' +
  '    type: number\n' +
  '    valueHint: 1\n' +
  '  - name: uniqueItems\n' +
  '    type: boolean\n' +
  "    valueHint: 'true'\n" +
  '  - name: maxContains\n' +
  '    type: number\n' +
  '    valueHint: 3\n' +
  '  - name: minContains\n' +
  '    type: number\n' +
  '    valueHint: 1\n' +
  '  - name: maxProperties\n' +
  '    type: number\n' +
  '    valueHint: 7\n' +
  '  - name: minProperties\n' +
  '    type: number\n' +
  '    valueHint: 1\n' +
  '  - name: required\n' +
  '    type: boolean\n' +
  "    valueHint: 'true'\n" +
  '  - name: dependentRequired\n' +
  '    type: Dependent Required Mapping\n' +
  '    \n' +
  '\n' +
  '  # ----------\n' +
  '  # Applicator vocabulary\n' +
  '  # ----------\n' +
  '  - name: prefixItems\n' +
  '    collection: list\n' +
  '    type: Schema Object\n' +
  '  - name: items\n' +
  '    type: Schema Object\n' +
  '  - name: contains\n' +
  '    type: Schema Object\n' +
  '  - name: additionalProperties\n' +
  '    type: Schema Object\n' +
  '  - name: properties\n' +
  '    type: Properties Mapping \n' +
  '  - name: patternProperties\n' +
  '    type: Pattern Properties Mapping \n' +
  '  - name: dependentSchemas\n' +
  '    type: Depdendent Schemas Mapping \n' +
  '  - name: propertyNames\n' +
  '    type: Schema Object\n' +
  '  - name: if\n' +
  '    type: Schema Object\n' +
  '  - name: then\n' +
  '    type: Schema Object\n' +
  '  - name: else\n' +
  '    type: Schema Object\n' +
  '  - name: allOf\n' +
  '    collection: list\n' +
  '    type: Schema Object\n' +
  '  - name: anyOf\n' +
  '    collection: list\n' +
  '    type: Schema Object\n' +
  '  - name: oneOf\n' +
  '    collection: list\n' +
  '    type: Schema Object\n' +
  '  - name: not\n' +
  '    type: Schema Object\n' +
  '\n' +
  '  # ----------\n' +
  '  # OpenAPI 3.1 vocabulary\n' +
  '  # ----------\n' +
  '\n' +
  '  - name: discriminator\n' +
  '    type: Discriminator Object\n' +
  '  - name: xml\n' +
  '    type: XML Object\n' +
  '  - name: externalDocs\n' +
  '    type: External Documentation Object\n' +
  '  - name: example\n' +
  '    type: any\n' +
  '\n' +
  '  # ----------\n' +
  '  # Unevaluated vocabulary\n' +
  '  # ----------\n' +
  '  - name: unevaluatedItems\n' +
  '    type: Schema Object\n' +
  '  - name: unevaluatedProperties\n' +
  '    type: Schema Object\n' +
  '  # ----------\n' +
  '  # Format Annotations and Format Assertion vocabulary\n' +
  '  # ----------\n' +
  '  - name: format\n' +
  '    type: string\n' +
  "    valueHint: 'password'\n" +
  '  # ----------\n' +
  '  # Content vocabulary\n' +
  '  # ----------\n' +
  '  - name: contentEncoding\n' +
  '    type: string\n' +
  '    valueHint: base64\n' +
  '  - name: contentMediaType\n' +
  '    type: string\n' +
  '    valueHint: image/png\n' +
  '  - name: contentSchema\n' +
  '    type: Schema Object\n' +
  '\n' +
  '- name: Vocabulary Mapping\n' +
  '  children:\n' +
  '  - name: vocabUri\n' +
  '    type: boolean\n' +
  "    keyHint: '(https://example.com/vocabulary-foo)'\n" +
  '    isPatternField: true\n' +
  '\n' +
  '- name: Defs Mapping\n' +
  '  children:\n' +
  '  - name: schemaName\n' +
  '    type: Schema Object\n' +
  '    isPatternField: true\n' +
  '\n' +
  '- name: Properties Mapping\n' +
  '  children:\n' +
  '  - name: propName\n' +
  '    type: Schema Object\n' +
  '    isPatternField: true\n' +
  '\n' +
  '- name: Pattern Properties Mapping\n' +
  '  children:\n' +
  '  - name: propName\n' +
  "    keyHint: '/^foo/'\n" +
  '    type: Schema Object\n' +
  '    isPatternField: true\n' +
  '\n' +
  '- name: Depdendent Schemas Mapping \n' +
  '  children:\n' +
  '  - name: propName\n' +
  '    type: Schema Object\n' +
  '    isPatternField: true\n' +
  '\n' +
  '- name: Dependent Required Mapping\n' +
  '  children:\n' +
  '  - name: propName\n' +
  '    keyHint: (fooProp)\n' +
  '    type: string\n' +
  "    valueHint: '[barProp, bazProp]'\n" +
  '    collection: list\n' +
  '    isPatternField: true\n' +
  '\n' +
  '\n' +
  '- name: Discriminator Object\n' +
  '  children:\n' +
  '    - name: propertyName\n' +
  '      type: string\n' +
  '      valueHint: "...XML name"\n' +
  '    - name: mapping\n' +
  '      type: string\n' +
  '      valueHint: "...XML name"\n' +
  '\n' +
  '- name: Discriminator Mapping Object\n' +
  '  children:\n' +
  '    - name: "(propName)"\n' +
  '      isPatternField: true\n' +
  '      type: string\n' +
  '      valueHint: "#/components/schemas/Pet"\n' +
  '\n' +
  '- name: XML Object\n' +
  '  children:\n' +
  '    - name: name\n' +
  '      type: string\n' +
  '      valueHint: "some-name"\n' +
  '    - name: namespace\n' +
  '      type: string\n' +
  "      valueHint: '...URI'\n" +
  '    - name: prefix\n' +
  '      type: string\n' +
  "      valueHint: 'foo-'\n" +
  '    - name: attribute\n' +
  '      type: boolean\n' +
  '    - name: wrapped\n' +
  '      type: boolean\n' +
  '- name: Security Scheme Object\n' +
  '  children:\n' +
  '    - name: type\n' +
  '      type: string\n' +
  "      valueHint: 'apiKey|http|mutualTLS|oauth2|openIdConnect'\n" +
  '    - name: description\n' +
  '      type: string\n' +
  "      valueHint: '...MarkDown'\n" +
  '    - name: in\n' +
  '      type: string\n' +
  "      valueHint: 'query|header|cookie'\n" +
  '    - name: scheme\n' +
  '      type: string\n' +
  '      valueHint: Basic\n' +
  '    - name: bearerFormat\n' +
  '      type: string\n' +
  '      valueHint: Bearer\n' +
  '    - name: flows\n' +
  '      type: OAuth Flows Object\n' +
  '    - name: openIdConnectUrl\n' +
  '      type: string\n' +
  "      valueHint: '...URL'\n" +
  '      \n' +
  '- name: OAuth Flows Object\n' +
  '  children:\n' +
  '    - name: implicit\n' +
  '      type: OAuth Flow Object\n' +
  '    - name: password\n' +
  '      type: OAuth Flow Object\n' +
  '    - name: clientCredentials\n' +
  '      type: OAuth Flow Object\n' +
  '    - name: authorizationCode\n' +
  '      type: OAuth Flow Object\n' +
  '- name: OAuth Flow Object\n' +
  '  children:\n' +
  '    - name: authorizationUrl\n' +
  '      type: string\n' +
  "      valueHint: '...URL'\n" +
  '    - name: tokenUrl\n' +
  '      type: string\n' +
  "      valueHint: '...URL'\n" +
  '    - name: refreshUrl\n' +
  '      type: string\n' +
  "      valueHint: '...URL'\n" +
  '    - name: scopes\n' +
  '      type: OAuth Flow Scopes Object\n' +
  '\n' +
  '- name: OAuth Flow Scoped Object\n' +
  '  children:\n' +
  "    - name: '...scope'\n" +
  '      type: string\n' +
  '      isPatternField: true\n' +
  '\n' +
  '- name: Security Requirement Object\n' +
  '  children:\n' +
  "    - name: 'name'\n" +
  '      isPatternField: true\n' +
  '      type: list\n' +
  '      valueHint: \'[..."scopes"]\'\n' +
  '\n' +
  '- name: Tag Object\n' +
  '  children:\n' +
  '  - name: description\n' +
  '    type: string\n' +
  '    valueHint: "...MarkDown"\n' +
  '  - name: externalDocs\n' +
  '    type: External Documentation Object\n';
