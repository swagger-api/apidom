import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../../target-specs.ts';

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
        '[Schema Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject)\n\\\n\\\n**Optional**. A Schema object containing the definitions for JMS specific headers (so-called protocol headers). This schema MUST be of type object and have a properties key. Examples of JMS protocol headers are JMSMessageID, JMSTimestamp, and JMSCorrelationID.',
    },
    targetSpecs: AsyncAPI2,
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
        '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject)\n\\\n\\\n**Optional**. A Schema object containing the definitions for JMS specific headers (so-called protocol headers). This schema MUST be of type object and have a properties key. Examples of JMS protocol headers are JMSMessageID, JMSTimestamp, and JMSCorrelationID.',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
];

export default completion;
