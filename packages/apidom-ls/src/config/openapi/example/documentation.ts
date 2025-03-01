import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs.ts';

const documentation = [
  {
    target: 'summary',
    docs: 'Short description for the example.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'description',
    docs: 'Long description for the example. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'value',
    docs: 'Embedded literal example. The `value` field and `externalValue` field are mutually exclusive. To represent examples of media types that cannot naturally represented in JSON or YAML, use a string value to contain the example, escaping where necessary.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'externalValue',
    docs: 'A URI that points to the literal example. This provides the capability to reference examples that cannot easily be included in JSON or YAML documents.  The `value` field and `externalValue` field are mutually exclusive.',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'externalValue',
    docs: 'A URI that points to the literal example. This provides the capability to reference examples that cannot easily be included in JSON or YAML documents.  The `value` field and `externalValue` field are mutually exclusive. See the rules for resolving [Relative References](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#relativeReferencesURI).',
    targetSpecs: OpenAPI31,
  },
  {
    docs: '#### [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#example-object#example-object)\n\nAllows sharing examples for operation responses.\n\n##### Patterned Fields\nField Pattern | Type | Description\n---|:---:|---\n{[mime type](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#example-object#mimeTypes)} | Any | The name of the property MUST be one of the Operation `produces` values (either implicit or inherited). The value SHOULD be an example of what such a response would look like.\n\n##### Example Object Example\n\nExample response for application/json mimetype of a Pet data type:\n\n```js\n{\n  "application/json": {\n    "name": "Puma",\n    "type": "Dog",\n    "color": "Black",\n    "gender": "Female",\n    "breed": "Mixed"\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\napplication/json:\n  name: Puma\n  type: Dog\n  color: Black\n  gender: Female\n  breed: Mixed\n```',
    targetSpecs: OpenAPI2,
  },
  {
    docs: "#### [Example Object](https://spec.openapis.org/oas/v3.0.4.html#example-object)\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\nsummary | `string` | Short description for the example.\ndescription | `string` | Long description for the example. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nvalue | Any | Embedded literal example. The `value` field and `externalValue` field are mutually exclusive. To represent examples of media types that cannot naturally represented in JSON or YAML, use a string value to contain the example, escaping where necessary.\nexternalValue | `string` | A URL that points to the literal example. This provides the capability to reference examples that cannot easily be included in JSON or YAML documents.  The `value` field and `externalValue` field are mutually exclusive.\n\nThis object MAY be extended with [Specification Extensions](https://spec.openapis.org/oas/v3.0.4.html#specification-extensions).\n\nIn all cases, the example value is expected to be compatible with the type schema\nof its associated value.  Tooling implementations MAY choose to\nvalidate compatibility automatically, and reject the example value(s) if incompatible.\n\n##### Example Object Examples\n\nIn a request body:\n\n\n\\\nYAML\n```yaml\nrequestBody:\n  content:\n    'application/json':\n      schema:\n        $ref: '#/components/schemas/Address'\n      examples:\n        foo:\n          summary: A foo example\n          value: {\"foo\": \"bar\"}\n        bar:\n          summary: A bar example\n          value: {\"bar\": \"baz\"}\n    'application/xml':\n      examples:\n        xmlExample:\n          summary: This is an example in XML\n          externalValue: 'http://example.org/examples/address-example.xml'\n    'text/plain':\n      examples:\n        textExample:\n          summary: This is a text example\n          externalValue: 'http://foo.bar/examples/address-example.txt'\n```\n\nIn a parameter:\n\n```yaml\nparameters:\n  - name: 'zipCode'\n    in: 'query'\n    schema:\n      type: 'string'\n      format: 'zip-code'\n    examples:\n      zip-example:\n        $ref: '#/components/examples/zip-example'\n```\n\nIn a response:\n\n```yaml\nresponses:\n  '200':\n    description: your car appointment has been booked\n    content:\n      application/json:\n        schema:\n          $ref: '#/components/schemas/SuccessResponse'\n        examples:\n          confirmation-success:\n            $ref: '#/components/examples/confirmation-success'\n```",
    targetSpecs: OpenAPI30,
  },
  {
    docs: "#### [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#exampleObject)\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nsummary | `string` | Short description for the example.\ndescription | `string` | Long description for the example. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nvalue | Any | Embedded literal example. The `value` field and `externalValue` field are mutually exclusive. To represent examples of media types that cannot naturally represented in JSON or YAML, use a string value to contain the example, escaping where necessary.\nexternalValue | `string` | A URI that points to the literal example. This provides the capability to reference examples that cannot easily be included in JSON or YAML documents.  The `value` field and `externalValue` field are mutually exclusive. See the rules for resolving [Relative References](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#relativeReferencesURI).\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n\\\nIn all cases, the example value is expected to be compatible with the type schema of its associated value. Tooling implementations MAY choose to validate compatibility automatically, and reject the example value(s) if incompatible.\n##### Example Object Examples\n\nIn a request body:\n\n\\\nYAML\n```yaml\nrequestBody:\n  content:\n    'application/json':\n      schema:\n        $ref: '#/components/schemas/Address'\n      examples: \n        foo:\n          summary: A foo example\n          value: {\"foo\": \"bar\"}\n        bar:\n          summary: A bar example\n          value: {\"bar\": \"baz\"}\n    'application/xml':\n      examples: \n        xmlExample:\n          summary: This is an example in XML\n          externalValue: 'https://example.org/examples/address-example.xml'\n    'text/plain':\n      examples:\n        textExample: \n          summary: This is a text example\n          externalValue: 'https://foo.bar/examples/address-example.txt'\n```\n\n\\\nIn a parameter:\n\n\\\nYAML\n```yaml\nparameters:\n  - name: 'zipCode'\n    in: 'query'\n    schema:\n      type: 'string'\n      format: 'zip-code'\n    examples:\n      zip-example: \n        $ref: '#/components/examples/zip-example'\n```\n\n\\\nIn a response:\n\n\\\nYAML\n```yaml\nresponses:\n  '200':\n    description: your car appointment has been booked\n    content: \n      application/json:\n        schema:\n          $ref: '#/components/schemas/SuccessResponse'\n        examples:\n          confirmation-success:\n            $ref: '#/components/examples/confirmation-success'\n```\n",
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
