import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const documentation = [
  {
    target: 'method',
    docs: '`string`\n\\\n\\\nThe HTTP method. Its value MUST be one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`, `CONNECT`, and `TRACE`.',
  },
  {
    target: 'query',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nA Schema object containing the definitions for each query parameter. This schema MUST be of type `object` and have a `properties` key.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'query',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nA Schema object containing the definitions for each query parameter. This schema MUST be of type `object` and have a `properties` key.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.3.0" MUST be assumed.',
  },
  {
    docs: '#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/http/README.md#operation-binding-object)\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`method` | string | The HTTP method. Its value MUST be one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`, `CONNECT`, and `TRACE`.\n`query` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) | A Schema object containing the definitions for each query parameter. This schema MUST be of type `object` and have a `properties` key.\n`bindingVersion` | string | The version of this binding. If omitted, "0.3.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/http/README.md#operation-binding-object)\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`method` | string | The HTTP method. Its value MUST be one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`, `CONNECT`, and `TRACE`.\n`query` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | A Schema object containing the definitions for each query parameter. This schema MUST be of type `object` and have a `properties` key.\n`bindingVersion` | string | The version of this binding. If omitted, "0.3.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
