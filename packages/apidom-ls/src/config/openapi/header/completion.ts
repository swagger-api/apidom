import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: '$ref',
    insertText: '\\$ref',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A reference to a Header.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'type',
    insertText: 'type',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**Required.** The internal type of the array. The value MUST be one of `"string"`, `"number"`, `"integer"`, `"boolean"`, or `"array"`.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'format',
    insertText: 'format',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The extending format for the previously mentioned [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#stType). See [Data Type Formats](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#dataTypeFormat) for further details.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'items',
    insertText: 'items',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Items Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#itemsObject)\n\\\n\\\n**Required if [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#stType) is "array".** Describes the type of items in the array.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'collectionFormat',
    insertText: 'collectionFormat',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Determines the format of the array if type array is used. Possible values are:\n\n* `csv` - comma separated values `foo,bar`.\n* `ssv` - space separated values `foo bar`.\n* `tsv` - tab separated values `foo\\tbar`.\n* `pipes` - pipe separated values `foo&#124;bar`.\n\nDefault value is `csv`.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'default',
    insertText: 'default',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`Any`\n\\\n\\\nDeclares the value of the item that the server will use if none is provided. (Note: "default" has no meaning for required items.) See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2. Unlike JSON Schema this value MUST conform to the defined [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#itemsType) for the data type.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'maximum',
    insertText: 'maximum',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`number`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'exclusiveMaximum',
    insertText: 'exclusiveMaximum',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'minimum',
    insertText: 'minimum',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`number`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'exclusiveMinimum',
    insertText: 'exclusiveMinimum',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'maxLength',
    insertText: 'maxLength',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.1.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'minLength',
    insertText: 'minLength',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.2.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'pattern',
    insertText: 'pattern',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.3.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'maxItems',
    insertText: 'maxItems',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.2.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'minItems',
    insertText: 'minItems',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.3.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'uniqueItems',
    insertText: 'uniqueItems',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.4.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'enum',
    insertText: 'enum',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`[*]`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'multipleOf',
    insertText: 'multipleOf',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`number`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.1.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'description',
    insertText: 'description',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A brief description of the header.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'description',
    insertText: 'description',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'A brief description of the header. This could contain examples of use. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'required',
    insertText: 'required',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Determines whether this header is mandatory. This property MAY be included and its default value is `false`.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'deprecated',
    insertText: 'deprecated',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Specifies that a header is deprecated and SHOULD be transitioned out of usage. Default value is `false`.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'allowEmptyValue',
    insertText: 'allowEmptyValue',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "Doesn't apply for headers. Default value is `false`. Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.",
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'style',
    insertText: 'style',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Describes how the header value will be serialized. Default value: `simple`.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'explode',
    insertText: 'explode',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'When this is true, header values of type array or object generate separate headers for each value of the array or key-value pair of the map. The default value is `false`.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'allowReserved',
    insertText: 'allowReserved',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "Determines whether the header value SHOULD allow reserved characters, as defined by [RFC3986](https://tools.ietf.org/html/rfc3986#section-2.2) `:/?#[]@!$&'()*+,;=` to be included without percent - encoding. This property has no effect and the default value is `false`.",
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'schema',
    insertText: 'schema',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema Object](https://spec.openapis.org/oas/v3.0.4.html#schema-object) | [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)\n\\\n\\\nThe schema defining the type used for the header.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'schema',
    insertText: 'schema',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)\n\\\n\\\nThe schema defining the type used for the header.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'example',
    insertText: 'example',
    kind: 14,
    format: CompletionFormat.UNDEFINED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "Example of the header's potential value. The example SHOULD match the specified schema and encoding properties if present. The `example` field is mutually exclusive of the `examples` field. Furthermore, if referencing a `schema` that contains an example, the `example` value SHALL *override* the example provided by the schema. To represent examples of media types that cannot naturally be represented in JSON or YAML, a string value can contain the example with escaping where necessary.",
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'examples',
    insertText: 'examples',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "Map[`string`, [Example Object](https://spec.openapis.org/oas/v3.0.4.html#example-object) &#124; [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)]\n\\\n\\\nExamples of the header's potential value. Each example SHOULD contain a value in the correct format as specified in the header encoding. The `examples` field is mutually exclusive of the `example` field. Furthermore, if referencing a `schema` that contains an example, the `examples` value SHALL *override* the example provided by the schema.",
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'examples',
    insertText: 'examples',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "Map[`string`, [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#exampleObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nExamples of the header's potential value. Each example SHOULD contain a value in the correct format as specified in the header encoding. The `examples` field is mutually exclusive of the `example` field. Furthermore, if referencing a `schema` that contains an example, the `examples` value SHALL *override* the example provided by the schema.",
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'content',
    insertText: 'content',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[string, [Media Type Object](https://spec.openapis.org/oas/v3.0.4.html#media-type-object)]\n\\\n\\\nA map containing the representations for the header. The key is the media type and the value describes it. The map MUST only contain one entry.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'content',
    insertText: 'content',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[string, [Media Type Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#mediaTypeObject)]\n\\\n\\\nA map containing the representations for the header. The key is the media type and the value describes it. The map MUST only contain one entry.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    target: 'type',
    label: 'string',
    insertText: 'string',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'type',
    label: 'number',
    insertText: 'number',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'type',
    label: 'integer',
    insertText: 'integer',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'type',
    label: 'boolean',
    insertText: 'boolean',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'type',
    label: 'array',
    insertText: 'array',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'int32',
    insertText: 'int32',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'int64',
    insertText: 'int64',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'float',
    insertText: 'float',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'double',
    insertText: 'double',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'byte',
    insertText: 'byte',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'binary',
    insertText: 'binary',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'date',
    insertText: 'date',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'date-time',
    insertText: 'date-time',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'password',
    insertText: 'password',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'collectionFormat',
    label: 'csv',
    insertText: 'csv',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'collectionFormat',
    label: 'ssv',
    insertText: 'ssv',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'collectionFormat',
    label: 'tsv',
    insertText: 'tsv',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'collectionFormat',
    label: 'pipes',
    insertText: 'pipes',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
];

export default completion;
