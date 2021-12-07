import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../apidom-language-types';

const asyncapiRootComplete: ApidomCompletionItem[] = [
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
        'The object provides metadata about the API. The metadata can be used by the clients if needed.',
    },
  },
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
        'The version string signifies the version of the AsyncAPI Specification that the document complies to. The format for this string _must_ be `major`.`minor`.`patch`. The `patch` _may_ be suffixed by a hyphen and extra alphanumeric characters.\n\n ---- \n\nA `major`.`minor` shall be used to designate the AsyncAPI Specification version, and will be considered compatible with the AsyncAPI Specification specified by that `major`.`minor` version. The patch version will not be considered by tooling, making no distinction between `1.0.0` and `1.0.1`.\n\n ---- \n\nIn subsequent versions of the AsyncAPI Specification, care will be given such that increments of the `minor` version should not interfere with operations of tooling developed to a lower minor version. Thus a hypothetical `1.1.0` specification should be usable with tooling designed for `1.0.0`.\n\n',
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
        'This field represents a unique universal identifier of the [application](https://www.asyncapi.com/docs/specifications/v2.2.0#definitionsApplication) the AsyncAPI document is defining. It must conform to the URI format, according to [RFC3986](https://tools.ietf.org/html/rfc3986).\n\n ---- \n\nIt is **RECOMMENDED** to use a [URN](https://tools.ietf.org/html/rfc8141) to globally and uniquely identify the application during long periods of time, even after it becomes unavailable or ceases to exist.',
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
        "A string representing the default content type to use when encoding/decoding a message's payload. The value **MUST** be a specific media type (e.g. `application/json`). This value **MUST** be used by schema parsers when the [contentType](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObjectContentType) property is omitted.",
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
        'Holds the relative paths to the individual channel and their operations. Channel paths are relative to servers.\n\n ---- \n\nChannels are also known as "topics", "routing keys", "event types" or "paths".',
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
        'The Servers Object is a map of [Server Objects](https://www.asyncapi.com/docs/specifications/v2.2.0#serverObject).',
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
        'Holds a set of reusable objects for different aspects of the AsyncAPI specification. All objects defined within the components object will have no effect on the API unless they are explicitly referenced from properties outside the components object.',
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
        'A list of tags used by the specification with additional metadata. Each tag name in the list **MUST** be unique.',
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
        '#### External Documentation Object\n\n ---- \n\nnAllows referencing an external resource for extended documentation.\n\n ---- \n\n##### Fixed Fields\n\n ---- \n\n**description** (`string`) : A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\n\n ---- \n\n**url** (`string`) : **Required.** The URL for the target documentation. Value MUST be in the format of a URL.\n\n ---- \n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
    },
  },
  {
    target: 'asyncapi',
    label: '2.0.0',
    insertText: '2.0.0',
    kind: 12,
    format: CompletionFormat.QUOTED_FORCED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    target: 'asyncapi',
    label: '2.1.0',
    insertText: '2.1.0',
    kind: 12,
    format: CompletionFormat.QUOTED_FORCED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
  {
    target: 'asyncapi',
    label: '2.2.0',
    insertText: '2.2.0',
    kind: 12,
    format: CompletionFormat.QUOTED_FORCED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
  },
];

export default asyncapiRootComplete;
