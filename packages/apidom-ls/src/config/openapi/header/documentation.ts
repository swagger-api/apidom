import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

/**
 * Omitted fixed fields for OpenAPI 3.1.0:
 *  - schema
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */
const documentation = [
  {
    target: 'type',
    docs: '**Required.** The internal type of the array. The value MUST be one of `"string"`, `"number"`, `"integer"`, `"boolean"`, or `"array"`.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    docs: 'The extending format for the previously mentioned [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#stType). See [Data Type Formats](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#dataTypeFormat) for further details.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'items',
    docs: '[Items Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#itemsObject)\n\\\n\\\n**Required if [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#stType) is "array".** Describes the type of items in the array.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'collectionFormat',
    docs: 'Determines the format of the array if type array is used. Possible values are:\n\n* `csv` - comma separated values `foo,bar`.\n* `ssv` - space separated values `foo bar`.\n* `tsv` - tab separated values `foo\\tbar`.\n* `pipes` - pipe separated values `foo&#124;bar`.\n\nDefault value is `csv`.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'default',
    docs: '`Any`\n\\\n\\\nDeclares the value of the item that the server will use if none is provided. (Note: "default" has no meaning for required items.) See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2. Unlike JSON Schema this value MUST conform to the defined [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#itemsType) for the data type.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'maximum',
    docs: '`number`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'exclusiveMaximum',
    docs: '`boolean`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'minimum',
    docs: '`number`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'exclusiveMinimum',
    docs: '`boolean`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'maxLength',
    docs: '`integer`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.1.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'minLength',
    docs: '`integer`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.2.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'pattern',
    docs: 'See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.3.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'maxItems',
    docs: '`integer`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.2.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'minItems',
    docs: '`integer`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.3.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'uniqueItems',
    docs: '`boolean`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.4.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'enum',
    docs: '`[*]`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'multipleOf',
    docs: '`number`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.1.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'description',
    docs: 'A brief description of the header.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'description',
    docs: 'A brief description of the header. This could contain examples of use. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'required',
    docs: 'Determines whether this header is mandatory. This property MAY be included and its default value is `false`.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'deprecated',
    docs: 'Specifies that a header is deprecated and SHOULD be transitioned out of usage. Default value is `false`.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'allowEmptyValue',
    docs: "Doesn't apply for headers. Default value is `false`. Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.",
    targetSpecs: OpenAPI3,
  },
  {
    target: 'style',
    docs: 'Describes how the header value will be serialized. Default value: `simple`.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'explode',
    docs: 'When this is true, header values of type array or object generate separate headers for each value of the array or key-value pair of the map. The default value is `false`.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'allowReserved',
    docs: "Determines whether the header value SHOULD allow reserved characters, as defined by [RFC3986](https://tools.ietf.org/html/rfc3986#section-2.2) `:/?#[]@!$&'()*+,;=` to be included without percent - encoding. This property has no effect and the default value is `false`.",
    targetSpecs: OpenAPI3,
  },
  {
    target: 'schema',
    docs: '[Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject) | [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject)\n\\\n\\\nThe schema defining the type used for the header.',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'example',
    docs: "Example of the header's potential value. The example SHOULD match the specified schema and encoding properties if present. The `example` field is mutually exclusive of the `examples` field. Furthermore, if referencing a `schema` that contains an example, the `example` value SHALL *override* the example provided by the schema. To represent examples of media types that cannot naturally be represented in JSON or YAML, a string value can contain the example with escaping where necessary.",
    targetSpecs: OpenAPI3,
  },
  {
    target: 'examples',
    docs: "Map[`string`, [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#exampleObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject)]\n\\\n\\\nExamples of the header's potential value. Each example SHOULD contain a value in the correct format as specified in the header encoding. The `examples` field is mutually exclusive of the `example` field. Furthermore, if referencing a `schema` that contains an example, the `examples` value SHALL *override* the example provided by the schema.",
    targetSpecs: OpenAPI30,
  },
  {
    target: 'examples',
    docs: "Map[`string`, [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#exampleObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nExamples of the header's potential value. Each example SHOULD contain a value in the correct format as specified in the header encoding. The `examples` field is mutually exclusive of the `example` field. Furthermore, if referencing a `schema` that contains an example, the `examples` value SHALL *override* the example provided by the schema.",
    targetSpecs: OpenAPI31,
  },
  {
    target: 'content',
    docs: 'Map[string, [Media Type Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#mediaTypeObject)]\n\\\n\\\nA map containing the representations for the header. The key is the media type and the value describes it. The map MUST only contain one entry.',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'content',
    docs: 'Map[string, [Media Type Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#mediaTypeObject)]\n\\\n\\\nA map containing the representations for the header. The key is the media type and the value describes it. The map MUST only contain one entry.',
    targetSpecs: OpenAPI31,
  },
  {
    docs: '#### [Header Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#header-object)\n\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | A short description of the header.\ntype | `string` | **Required.** The type of the object. The value MUST be one of `"string"`, `"number"`, `"integer"`, `"boolean"`, or `"array"`.\nformat | `string` | The extending format for the previously mentioned [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#stType). See [Data Type Formats](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#dataTypeFormat) for further details.\nitems | [Items Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#itemsObject) | **Required if [`type`](#stType) is "array".** Describes the type of items in the array.\ncollectionFormat | `string` | Determines the format of the array if type array is used. Possible values are: `csv` - comma separated values `foo,bar`. `ssv` - space separated values `foo bar`. `tsv` - tab separated values `foo\\tbar`. `pipes` - pipe separated values foo&#124bar. Default value is `csv`.\ndefault | * | Declares the value of the header that the server will use if none is provided. (Note: "default" has no meaning for required headers.) See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2. Unlike JSON Schema this value MUST conform to the defined [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#headerDefault) for the header.\nmaximum | `number` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.\nexclusiveMaximum | `boolean` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.\nminimum | `number` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.\nexclusiveMinimum | `boolean` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.\nmaxLength | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.1.\nminLength | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.2.\npattern | `string` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.3.\nmaxItems | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.2.\nminItems | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.3.\nuniqueItems | `boolean` | https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.4.\nenum | [*] | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1.\nmultipleOf | `number` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.1.\n\n##### Patterned Objects\n\nField Pattern | Type | Description\n---|:---:|---\n^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#vendorExtensions) for further details.\n\n##### Header Object Example\n\nA simple header with of an integer type:\n\n```js\n{\n  "description": "The number of allowed requests in the current period",\n  "type": "integer"\n}\n```\n\n\n\\\nYAML\n```yaml\ndescription: The number of allowed requests in the current period\ntype: integer\n```',
    targetSpecs: OpenAPI2,
  },
  {
    docs: '#### [Header Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#headerObject)\n\nThe Header Object follows the structure of the [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterObject) with the following changes:\n\n1. `name` MUST NOT be specified, it is given in the corresponding `headers` map.\n1. `in` MUST NOT be specified, it is implicitly in `header`.\n1. All traits that are affected by the location MUST be applicable to a location of `header` (for example, [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterStyle)).\n\n##### Header Object Example\n\nA simple header of type `integer`:\n\n\n\\\nJSON\n```json\n{\n  "description": "The number of allowed requests in the current period",\n  "schema": {\n    "type": "integer"\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\ndescription: The number of allowed requests in the current period\nschema:\n  type: integer\n```',
    targetSpecs: OpenAPI30,
  },
  {
    docs: '#### [Header Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#headerObject)\n\nThe Header Object follows the structure of the [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) with the following changes:\n\n 1. `name` MUST NOT be specified, it is given in the corresponding `headers` map.\n  2. `in` MUST NOT be specified, it is implicitly in `header`.\n  3. All traits that are affected by the location MUST be applicable to a location of `header` (for example, [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterStyle)).\n\n##### Header Object Example\n\n\\\nA simple header of type `integer`:\n\n\\\nJSON\n```json\n{\n  "description": "The number of allowed requests in the current period",\n  "schema": {\n    "type": "integer"\n  }\n}\n```\n\n\\\nYAML\n```yaml\ndescription: The number of allowed requests in the current period\nschema:\n  type: integer\n```\n',
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
