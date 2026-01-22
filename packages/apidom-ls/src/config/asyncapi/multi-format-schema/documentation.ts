import { AsyncAPI3 } from '../target-specs.ts';

const documentation = [
  {
    docs: '#### [Multi Format Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#multiFormatSchemaObject)\n\nThe Multi Format Schema Object represents a schema definition. It differs from the [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) in that it supports multiple schema formats or languages (e.g., JSON Schema, Avro, etc.).',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'schemaFormat',
    docs: 'A string containing the name of the schema format that is used to define the message payload. If omitted, implementations should parse the payload as a [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject). When the payload is defined using a $ref to a remote file, it is RECOMMENDED the schema format includes the file encoding type to allow implementations to parse the file correctly. E.g., adding +yaml if content type is application/vnd.apache.avro results in application/vnd.apache.avro+yaml.\\\n\\\nCheck out the [supported schema formats table](https://www.asyncapi.com/docs/reference/specification/v3.0.0#multiFormatSchemaFormatTable) for more information. Custom values are allowed but their implementation is OPTIONAL. A custom value MUST NOT refer to one of the schema formats listed in the [table](https://www.asyncapi.com/docs/reference/specification/v3.0.0#multiFormatSchemaFormatTable).\\\n\\\nWhen using [Reference Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) within the schema, the schemaFormat of the resource being referenced MUST match the schemaFormat of the schema that contains the initial reference. For example, if you reference Avro schema, then schemaFormat of referencing resource and the resource being referenced MUST match.\\\n\\\n**Note:** This field is optional, but despite this, for clarity and explicitness, we recommend that you always use it to specify the schema format. For AsyncAPI v2.x documents, the default value is `application/vnd.aai.asyncapi;version=2.x.0`, while for AsyncAPI v3.0.0 documents, the default value is `application/vnd.aai.asyncapi+json;version=3.0.0` or `application/vnd.aai.asyncapi+yaml;version=3.0.0`, depending on the protocol of the given document.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'schema',
    docs: 'Definition of the message payload. It can be of any type but defaults to [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject). It MUST match the schema format defined in [schemaFormat](https://www.asyncapi.com/docs/reference/specification/v3.0.0#multiFormatSchemaObjectSchemaFormat), including the encoding type. E.g., Avro should be inlined as either a YAML or JSON object instead of as a string to be parsed as YAML or JSON. Non-JSON-based schemas (e.g., Protobuf or XSD) MUST be inlined as a string.',
    targetSpecs: AsyncAPI3,
  },
];

export default documentation;
