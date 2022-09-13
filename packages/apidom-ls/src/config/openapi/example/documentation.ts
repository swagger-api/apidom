const documentation = [
  {
    target: 'summary',
    docs: 'Short description for the example.',
  },
  {
    target: 'description',
    docs: 'Long description for the example. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
  },
  {
    target: 'value',
    docs: 'Embedded literal example. The `value` field and `externalValue` field are mutually exclusive. To represent examples of media types that cannot naturally represented in JSON or YAML, use a string value to contain the example, escaping where necessary.',
  },
  {
    target: 'externalValue',
    docs: 'A URI that points to the literal example. This provides the capability to reference examples that cannot easily be included in JSON or YAML documents.  The `value` field and `externalValue` field are mutually exclusive. See the rules for resolving [Relative References](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#relativeReferencesURI).',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    docs: "#### Example Object\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nsummary | `string` | Short description for the example.\ndescription | `string` | Long description for the example. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nvalue | Any | Embedded literal example. The `value` field and `externalValue` field are mutually exclusive. To represent examples of media types that cannot naturally represented in JSON or YAML, use a string value to contain the example, escaping where necessary.\nexternalValue | `string` | A URI that points to the literal example. This provides the capability to reference examples that cannot easily be included in JSON or YAML documents.  The `value` field and `externalValue` field are mutually exclusive. See the rules for resolving [Relative References](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#relativeReferencesURI).\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n\\\nIn all cases, the example value is expected to be compatible with the type schema of its associated value. Tooling implementations MAY choose to validate compatibility automatically, and reject the example value(s) if incompatible.\n##### Example Object Examples\n\nIn a request body:\n\n\\\nYAML\n```yaml\nrequestBody:\n  content:\n    'application/json':\n      schema:\n        $ref: '#/components/schemas/Address'\n      examples: \n        foo:\n          summary: A foo example\n          value: {\"foo\": \"bar\"}\n        bar:\n          summary: A bar example\n          value: {\"bar\": \"baz\"}\n    'application/xml':\n      examples: \n        xmlExample:\n          summary: This is an example in XML\n          externalValue: 'https://example.org/examples/address-example.xml'\n    'text/plain':\n      examples:\n        textExample: \n          summary: This is a text example\n          externalValue: 'https://foo.bar/examples/address-example.txt'\n```\n\n\\\nIn a parameter:\n\n\\\nYAML\n```yaml\nparameters:\n  - name: 'zipCode'\n    in: 'query'\n    schema:\n      type: 'string'\n      format: 'zip-code'\n    examples:\n      zip-example: \n        $ref: '#/components/examples/zip-example'\n```\n\n\\\nIn a response:\n\n\\\nYAML\n```yaml\nresponses:\n  '200':\n    description: your car appointment has been booked\n    content: \n      application/json:\n        schema:\n          $ref: '#/components/schemas/SuccessResponse'\n        examples:\n          confirmation-success:\n            $ref: '#/components/examples/confirmation-success'\n```\n",
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
