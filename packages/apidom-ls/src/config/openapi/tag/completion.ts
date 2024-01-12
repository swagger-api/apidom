import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';
import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

const completion: ApidomCompletionItem[] = [
  {
    label: 'name',
    insertText: 'name',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '**Required.** The name of the tag.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'name',
    insertText: 'name',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '**REQUIRED**. The name of the tag.',
    },
    targetSpecs: OpenAPI3,
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
        'A short description for the tag. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.',
    },
    targetSpecs: OpenAPI2,
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
        'A description for the tag. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    },
    targetSpecs: OpenAPI3,
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
        '[External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#externalDocumentationObject)\n\\\n\\\nAdditional external documentation for this tag.',
    },
    targetSpecs: OpenAPI2,
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
        '[External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#externalDocumentationObject)\n\\\n\\\nAdditional external documentation for this tag.',
    },
    targetSpecs: OpenAPI30,
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
        '[External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#externalDocumentationObject)\n\\\n\\\nAdditional external documentation for this tag.',
    },
    targetSpecs: OpenAPI31,
  },
];

export default completion;
