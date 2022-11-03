import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../apidom-language-types';

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
        '[Schema object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject)\n\\\n\\\n**Optional**. A Schema object containing the definitions for Anypoint MQ-specific headers (so-called protocol headers). This schema MUST be of type `object` and have a `properties` key. Examples of Anypoint MQ protocol headers are `messageId` and `messageGroupId`.',
    },
  },
  {
    label: 'bindingVersion',
    insertText: 'bindingVersion',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '**Optional**, defaults to `latest`. The version of this binding.',
    },
  },
];

export default completion;
