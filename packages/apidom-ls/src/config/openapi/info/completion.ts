import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'title',
    insertText: 'title',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '**REQUIRED.** The title of the API.',
    },
  },
  {
    label: 'summary',
    insertText: 'summary',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A short summary of the API.',
    },
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
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
        'A description of the API. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
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
      value: 'A URL to the Terms of Service for the API. This MUST be in the form of a URL.',
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
        '[Contact Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#contactObject)\n\\\n\\\nThe contact information for the exposed API.',
    },
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
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
        '[Contact Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#contactObject)\n\\\n\\\nThe contact information for the exposed API.',
    },
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
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
        '[License Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#licenseObject)\n\\\n\\\nThe license information for the exposed API.',
    },
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
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
        '[License Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#licenseObject)\n\\\n\\\nThe license information for the exposed API.',
    },
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
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
        '**REQUIRED**. The version of the OpenAPI document (which is distinct from the [OpenAPI Specification version](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasVersion) or the API implementation version).',
    },
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
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
        '**REQUIRED**. The version of the OpenAPI document (which is distinct from the [OpenAPI Specification version](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasVersion) or the API implementation version).',
    },
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default completion;
