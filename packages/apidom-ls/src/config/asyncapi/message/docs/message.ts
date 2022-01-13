const messageDocs = [
  {
    target: 'headers',
    docs: '[Schema Object](https://www.asyncapi.com/docs/specifications/v2.2.0#schemaObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.2.0#referenceObject)\n\n ----\n\nSchema definition of the application headers. Schema MUST be of type "object". It **MUST NOT** define the protocol headers.',
  },
  {
    target: 'payload',
    docs: 'Definition of the message payload. It can be of any type but defaults to [Schema object](https://www.asyncapi.com/docs/specifications/v2.2.0#schemaObject). It must match the schema format, including encoding type - e.g Avro should be inlined as either a YAML or JSON object NOT a string to be parsed as YAML or JSON.',
  },
  {
    target: 'correlationId',
    docs: '[Correlation ID Object](https://www.asyncapi.com/docs/specifications/v2.2.0#correlationIdObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.2.0#referenceObject)\n\n ---- \n\nDefinition of the correlation ID used for message tracing or matching.',
  },
  {
    target: 'schemaFormat',
    docs:
      'A string containing the name of the schema format used to define the message payload. If omitted, implementations should parse the payload as a [Schema object](https://www.asyncapi.com/docs/specifications/v2.2.0#schemaObject). When the payload is defined using a `$ref` to a remote file, it is RECOMMENDED the schema format includes the file encoding type to allow implementations to parse the file correctly. E.g., adding `+yaml` if content type is `application/vnd.apache.avro` results in `application/vnd.apache.avro+yaml`.  \n' +
      '\n\n ---- \n\nCheck out the [supported schema formats table](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObjectSchemaFormatTable) for more information. Custom values are allowed but their implementation is OPTIONAL. A custom value MUST NOT refer to one of the schema formats listed in the [table](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObjectSchemaFormatTable).',
  },
  {
    target: 'contentType',
    docs: "The content type to use when encoding/decoding a message's payload. The value MUST be a specific media type (e.g. `application/json`). When omitted, the value MUST be the one specified on the [defaultContentType](https://www.asyncapi.com/docs/specifications/v2.2.0#defaultContentTypeString) field.",
  },
  {
    target: 'name',
    docs: 'A machine-friendly name for the message.',
  },
  {
    target: 'title',
    docs: 'A human-friendly title for the message.',
  },
  {
    target: 'summary',
    docs: 'A short summary of what the message is about.',
  },
  {
    target: 'description',
    docs: 'A verbose explanation of the message. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
  {
    target: 'tags',
    docs: '[Tags Object](https://www.asyncapi.com/docs/specifications/v2.2.0#tagsObject)\n\n ---- \n\nA list of tags for API documentation control.',
  },
  {
    target: 'externalDocs',
    docs: '[External Documentation Object](https://www.asyncapi.com/docs/specifications/v2.2.0#externalDocumentationObject)\n\n ---- \n\nAdditional external documentation for this message..',
  },
  {
    target: 'bindings',
    docs: '[Message Bindings Object](https://www.asyncapi.com/docs/specifications/v2.2.0#messageBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.2.0#referenceObject)\n\n ---- \n\nA map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the message.',
  },
  {
    target: 'examples',
    docs: '\\[[Message Example Object](https://www.asyncapi.com/docs/specifications/v2.2.0#messageExampleObject)\\]\n\n ---- \n\nList of examples.',
  },
  {
    target: 'traits',
    docs: '[[Message Trait Object](https://www.asyncapi.com/docs/specifications/v2.2.0#messageTraitObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.2.0#referenceObject)]\n\n ---- \n\nA list of traits to apply to the message object. Traits MUST be merged into the message object using the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) algorithm in the same order they are defined here. The resulting object MUST be a valid [Message Object](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObject).\n\n ---- \n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
  },
  {
    docs: '[Message Object](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObject)\\n\\n ---- \\n\\nDescribes a message received on a given channel and operation.\\n\\n ---- \\n\\nA message is the mechanism by which information is exchanged via a channel between servers and applications. A message MUST contain a payload and MAY also contain headers. The headers MAY be subdivided into protocol-defined headers and header properties defined by the application which can act as supporting metadata. The payload contains the data, defined by the application, which MUST be serialized into a format (JSON, XML, Avro, binary, etc.). Since a message is a generic mechanism, it can support multiple interaction patterns such as event, command, request, or response.',
  },
];
export default messageDocs;
