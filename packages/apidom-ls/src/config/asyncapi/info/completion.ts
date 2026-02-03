import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

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
      value: '**REQUIRED.** The title of the application.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '**REQUIRED.** Provides the version of the application API (not to be confused with the specification version).',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
      value:
        'A URL to the Terms of Service for the API. This MUST be in the form of an absolute URL.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
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
        '[Contact Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#contactObject)\n\\\n\\\nContact information for the exposed API.',
    },
    targetSpecs: AsyncAPI2,
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
        '[Contact Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#contactObject)\n\\\n\\\nContact information for the exposed API.',
    },
    targetSpecs: AsyncAPI3,
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
        '[License Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#licenseObject)\n\\\n\\\nLicense information for the exposed API.',
    },
    targetSpecs: AsyncAPI2,
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
        '[License Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#licenseObject)\n\\\n\\\nLicense information for the exposed API.',
    },
    targetSpecs: AsyncAPI3,
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
        '[[Tag Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#tagObject)]\n\\\n\\\nA list of tags for application API documentation control. Tags can be used for logical grouping of applications.',
    },
    targetSpecs: AsyncAPI3,
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
        '[External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#externalDocumentationObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nAdditional external documentation of the exposed API.',
    },
    targetSpecs: AsyncAPI3,
  },
];

export default completion;
