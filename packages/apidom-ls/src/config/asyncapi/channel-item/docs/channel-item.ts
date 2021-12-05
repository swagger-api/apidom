const channelDocs = [
  {
    target: '$ref',
    docs: "Allows for an external definition of this channel item.\n\n ---- \n\nThe referenced structure **MUST** be in the format of a [Channel Item Object](https://www.asyncapi.com/docs/specifications/v2.2.0#channelItemObject). \n\n ---- \n\nIf there are conflicts between the referenced definition and this Channel Item's definition, the behavior is _undefined_.",
  },
  {
    target: 'description',
    docs: 'An optional description of this channel item. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
  {
    target: 'servers',
    docs: 'The servers on which this channel is available, specified as an optional unordered list of names (string keys) of [Server Objects](https://www.asyncapi.com/docs/specifications/v2.2.0#serverObject) defined in the [Servers Object](https://www.asyncapi.com/docs/specifications/v2.2.0#serversObject) (a map). If `servers` is absent or empty then this channel must be available on all servers defined in the [Servers Object](https://www.asyncapi.com/docs/specifications/v2.2.0#serversObject).',
  },
  {
    target: 'subscribe',
    docs: '[Operation Object](https://www.asyncapi.com/docs/specifications/v2.2.0#operationObject)\n\n ---- \n\nA definition of the SUBSCRIBE operation, which defines the messages produced by the application and sent to the channel.',
  },
  {
    target: 'publish',
    docs: '[Operation Object](https://www.asyncapi.com/docs/specifications/v2.2.0#operationObject)\n\n ---- \n\nA definition of the PUBLISH operation, which defines the messages consumed by the application from the channel.',
  },
  {
    target: 'parameters',
    docs: '[Parameters Object](https://www.asyncapi.com/docs/specifications/v2.2.0#parametersObject)\n\n ---- \n\nA map of the parameters included in the channel name. It **SHOULD** be present only when using channels with expressions (as defined by [RFC 6570 section 2.2](https://tools.ietf.org/html/rfc6570#section-2.2)).',
  },
  {
    target: 'bindings',
    docs: '[Channel Bindings Object](https://www.asyncapi.com/docs/specifications/v2.2.0#channelBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.2.0#referenceObject)\n\n ---- \n\nA map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the channel.\n\n ---- \n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
  },
  {
    docs: 'Describes the operations available on a single channel.\n\n ---- \n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
  },
];
export default channelDocs;
