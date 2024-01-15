import { OpenAPI2 } from '../target-specs';

const documentation = [
  {
    target: 'type',
    docs: '**Required.** The internal type of the array. The value MUST be one of `"string"`, `"number"`, `"integer"`, `"boolean"`, or `"array"`. Files and models are not allowed.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    docs: 'The extending format for the previously mentioned [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterType). See [Data Type Formats](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#dataTypeFormat) for further details.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'items',
    docs: '[Items Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#itemsObject)\n\\\n\\\n**Required if [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#itemsType) is "array".** Describes the type of items in the array.',
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
    docs: '#### [Items Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#items-object)\n\nA limited subset of JSON-Schema\'s items object. It is used by parameter definitions that are not located [`in`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterIn) `"body"`.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\ntype | `string` | **Required.** The internal type of the array. The value MUST be one of `"string"`, `"number"`, `"integer"`, `"boolean"`, or `"array"`. Files and models are not allowed.\nformat | `string` | The extending format for the previously mentioned [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterType). See [Data Type Formats](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#dataTypeFormat) for further details.\nitems | [Items Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#itemsObject) | **Required if [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#itemsType) is "array".** Describes the type of items in the array.\ncollectionFormat | `string` | Determines the format of the array if type array is used. Possible values are: `csv` - comma separated values `foo,bar`. `ssv` - space separated values `foo bar`. `tsv` - tab separated values `foo\\tbar`. `pipes` - pipe separated values `foo&#124;bar`. Default value is `csv`.\ndefault | * | Declares the value of the item that the server will use if none is provided. (Note: "default" has no meaning for required items.) See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2. Unlike JSON Schema this value MUST conform to the defined [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#itemsType) for the data type.\nmaximum | `number` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.\nexclusiveMaximum | `boolean` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.\nminimum | `number` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.\nexclusiveMinimum | `boolean` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.\nmaxLength | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.1.\nminLength | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.2.\npattern | `string` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.3.\nmaxItems | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.2.\nminItems | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.3.\nuniqueItems | `boolean` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.4.\nenum | [*] | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1.\nmultipleOf | `number` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.1.\n\n##### Patterned Objects\n\nField Pattern | Type | Description\n---|:---:|---\n^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#vendorExtensions) for further details.\n\n##### Items Object Examples\n\nItems must be of type  string and have the minimum length of  2 characters:\n\n```js\n{\n    "type": "string",\n    "minLength": 2\n}\n```\n\n\n\\\nYAML\n```yaml\ntype: string\nminLength: 2\n```\n\nAn array of arrays, the internal array being of type integer, numbers must be between 0 and 63 (inclusive):\n\n```js\n{\n    "type": "array",\n    "items": {\n        "type": "integer",\n        "minimum": 0,\n        "maximum": 63\n    }\n}\n```\n\n```yaml\ntype: array\nitems:\n  type: integer\n  minimum: 0\n  maximum: 63\n```',
    targetSpecs: OpenAPI2,
  },
];
export default documentation;
