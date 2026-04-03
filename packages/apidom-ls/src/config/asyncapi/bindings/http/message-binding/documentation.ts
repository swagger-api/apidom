import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const documentation = [
  {
    target: 'headers',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nA Schema object containing the definitions for HTTP-specific headers. This schema MUST be of type `object` and have a `properties` key.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'headers',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nA Schema object containing the definitions for HTTP-specific headers. This schema MUST be of type `object` and have a `properties` key.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'statusCode',
    docs: '`integer`\n\\\n\\\nThe HTTP response status code according to [RFC 9110](https://httpwg.org/specs/rfc9110.html#overview.of.status.codes). `statusCode` is only relevant for messages referenced by the [Operation Reply Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyObject), as it defines the status code for the response. In all other cases, this value can be safely ignored.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.3.0" MUST be assumed.',
  },
  {
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/http/README.md#message-binding-object)\n\nThis object contains information about the message representation in HTTP.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`headers` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) | A Schema object containing the definitions for HTTP-specific headers. This schema MUST be of type `object` and have a `properties` key.\n`bindingVersion` | string | The version of this binding. If omitted, "0.3.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/http/README.md#message-binding-object)\n\nThis object contains information about the message representation in HTTP.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`headers` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | A Schema object containing the definitions for HTTP-specific headers. This schema MUST be of type `object` and have a `properties` key.\n`statusCode` | integer | The HTTP response status code according to [RFC 9110](https://httpwg.org/specs/rfc9110.html#overview.of.status.codes). `statusCode` is only relevant for messages referenced by the [Operation Reply Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyObject), as it defines the status code for the response. In all other cases, this value can be safely ignored.\n`bindingVersion` | string | The version of this binding. If omitted, "0.3.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
