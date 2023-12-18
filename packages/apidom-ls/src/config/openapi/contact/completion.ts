import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../target-specs';

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
      value: 'The identifying name of the contact person/organization.',
    },
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'url',
    insertText: 'url',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The URL pointing to the contact information. This MUST be in the format of a URL.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'url',
    insertText: 'url',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The URL pointing to the contact information. This MUST be in the form of a URL.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'email',
    insertText: 'email',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The email address of the contact person/organization. This MUST be in the format of an email address.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'email',
    insertText: 'email',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The email address of the contact person/organization. This MUST be in the form of an email address.',
    },
    targetSpecs: OpenAPI3,
  },
];

export default completion;
