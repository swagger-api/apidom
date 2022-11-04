import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'asyncapi',
    insertText: 'asyncapi',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[AsyncAPI Version String](https://www.asyncapi.com/docs/reference/specification/v2.5.0#A2SVersionString)\n\\\n\\\n**REQUIRED.** Specifies the AsyncAPI Specification version being used. It can be used by tooling Specifications and clients to interpret the version. The structure shall be `major`.`minor`.`patch`, where `patch` versions _must_ be compatible with the existing `major`.`minor` tooling. Typically patch versions will be introduced to address errors in the documentation, and tooling should typically be compatible with the corresponding `major`.`minor` (1.0.*). Patch versions will correspond to patches of this document.',
    },
  },
  {
    label: 'id',
    insertText: 'id',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Identifier](https://www.asyncapi.com/docs/reference/specification/v2.5.0#A2SIdString)\n\\\n\\\nIdentifier of the [application](https://www.asyncapi.com/docs/reference/specification/v2.5.0#definitionsApplication) the AsyncAPI document is defining. This field represents a unique universal identifier of the [application](#definitionsApplication) the AsyncAPI document is defining. It must conform to the URI format, according to [RFC3986](https://tools.ietf.org/html/rfc3986).\n\\\n\\\nIt is RECOMMENDED to use a [URN](https://tools.ietf.org/html/rfc8141) to globally and uniquely identify the application during long periods of time, even after it becomes unavailable or ceases to exist.',
    },
  },
  {
    label: 'info',
    insertText: 'info',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Info Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#infoObject)\n\\\n\\\n**REQUIRED.** Provides metadata about the API. The metadata can be used by the clients if needed.',
    },
  },
  {
    label: 'servers',
    insertText: 'servers',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Servers Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#serversObject)\n\\\n\\\nProvides connection details of servers. The Servers Object is a map of [Server Objects](https://www.asyncapi.com/docs/reference/specification/v2.5.0#serverObject).',
    },
  },
  {
    label: 'defaultContentType',
    insertText: 'defaultContentType',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "[Default Content Type](https://www.asyncapi.com/docs/reference/specification/v2.5.0#defaultContentTypeString)\n\\\n\\\nDefault content type to use when encoding/decoding a message's payload.\n\\\n\\\nIt's a string representing the default content type to use when encoding/decoding a message's payload. The value MUST be a specific media type (e.g. `application/json`). This value MUST be used by schema parsers when the [contentType](https://www.asyncapi.com/docs/reference/specification/v2.5.0#messageObjectContentType) property is omitted.\n\nIn case a message can't be encoded/decoded using this value, schema parsers MUST use their default content type.",
    },
  },
  {
    label: 'channels',
    insertText: 'channels',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Channels Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#channelsObject)\n\\\n\\\n**REQUIRED**. The available channels and messages for the API. Holds the relative paths to the individual channel and their operations. Channel paths are relative to servers. Channels are also known as "topics", "routing keys", "event types" or "paths".',
    },
  },
  {
    label: 'components',
    insertText: 'components',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Components Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#componentsObject)\n\\\n\\\nAn element to hold various schemas for the specification. Holds a set of reusable objects for different aspects of the AsyncAPI specification. All objects defined within the components object will have no effect on the API unless they are explicitly referenced from properties outside the components object.',
    },
  },
  {
    label: 'tags',
    insertText: 'tags',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Tags Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#tagsObject)\n\\\n\\\nA list of tags used by the specification with additional metadata. Each tag name in the list **MUST** be unique.',
    },
  },
  {
    label: 'externalDocs',
    insertText: 'externalDocs',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#externalDocumentationObject)\n\\\n\\\nAdditional external documentation. Allows referencing an external resource for extended documentation.',
    },
  },
];

export default completion;
