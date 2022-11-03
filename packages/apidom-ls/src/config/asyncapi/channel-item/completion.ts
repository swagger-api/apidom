import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';

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
      value:
        'Allows for a referenced definition of this channel item. The referenced structure MUST be in the form of a [Channel Item Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#channelItemObject). In case a Channel Item Object field appears both in the defined object and the referenced object, the behavior is *undefined*. Resolution is done as defined by the [JSON Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03).\n\\\n\\\n**Deprecated:** Usage of the `$ref` property has been deprecated.',
    },
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
        'An optional description of this channel item. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
    },
  },
  {
    label: 'servers',
    insertText: 'servers',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`[string]`\n\\\n\\\nThe servers on which this channel is available, specified as an optional unordered list of names (string keys) of [Server Objects](https://www.asyncapi.com/docs/reference/specification/v2.5.0#serverObject) defined in the [Servers Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0https://www.asyncapi.com/docs/reference/specification/v2.5.0#serversObject) (a map). If `servers` is absent or empty then this channel must be available on all servers defined in the [Servers Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#serversObject).',
    },
  },
  {
    label: 'subscribe',
    insertText: 'subscribe',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#operationObject)\n\\\n\\\nA definition of the SUBSCRIBE operation, which defines the messages produced by the application and sent to the channel.',
    },
  },
  {
    label: 'publish',
    insertText: 'publish',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#operationObject)\n\\\n\\\nA definition of the PUBLISH operation, which defines the messages consumed by the application from the channel.',
    },
  },
  {
    label: 'parameters',
    insertText: 'parameters',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Parameters Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#parametersObject)\n\\\n\\\nA map of the parameters included in the channel name. It SHOULD be present only when using channels with expressions (as defined by [RFC 6570 section 2.2](https://tools.ietf.org/html/rfc6570#section-2.2)).',
    },
  },
  {
    label: 'bindings',
    insertText: 'bindings',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Channel Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#channelBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)\n\\\n\\\nA map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the channel.',
    },
  },
  {
    target: 'servers',
    label: 'servers',
    insertText: '?',
    arrayMember: true,
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    function: 'apicompleteChannelServers',
    insertTextFormat: 2,
  },
];

export default completion;
