import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'propertyName',
    insertText: 'propertyName',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**REQUIRED**. The name of the property in the payload that will hold the discriminator value.',
    },
  },
  {
    label: 'mapping',
    insertText: 'mapping',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[string, string]\n\\\n\\\nAn object to hold mappings between payload values and schema names or references.',
    },
  },
];

export default completion;
