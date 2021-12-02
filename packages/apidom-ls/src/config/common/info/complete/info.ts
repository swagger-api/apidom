import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../apidom-language-types';

const infoComplete: ApidomCompletionItem[] = [
  {
    label: 'license',
    insertText: 'license',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[License Object](https://www.asyncapi.com/docs/specifications/v2.2.0#licenseObject) - License information for the exposed API.\n\n ---- \n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
    },
  },
  {
    label: 'version',
    insertText: 'version',
    kind: 14,
    format: CompletionFormat.QUOTED_FORCED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**Required** Provides the version of the application API (not to be confused with the specification version).',
    },
  },
  {
    label: 'title',
    insertText: 'title',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '**Required.** The title of the application.',
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
        'A short description of the application. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
    },
  },
  {
    label: 'termsOfService',
    insertText: 'termsOfService',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A URL to the Terms of Service for the API. MUST be in the format of a URL.',
    },
  },
  {
    label: 'contact',
    insertText: 'contact',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Contact Object](https://www.asyncapi.com/docs/specifications/v2.2.0#contactObject) - Contact information for the exposed API.\n\n ---- \n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
    },
  },
];

export default infoComplete;
