import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'method',
    insertText: 'method',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The HTTP method to use when establishing the connection. Its value MUST be either `GET` or `POST`.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'query',
    insertText: 'query',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject)\n\\\n\\\nA Schema object containing the definitions for each query parameter. This schema MUST be of type `object` and have a `properties` key.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
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
        '[Schema object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject)\n\\\n\\\nA Schema object containing the definitions of the HTTP headers to use when establishing the connection. This schema MUST be of type `object` and have a `properties` key.',
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
