import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'headers',
    insertText: 'headers',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject)\n\\\n\\\nA Schema object containing the definitions for HTTP-specific headers. This schema MUST be of type `object` and have a `properties` key.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
];

export default completion;
