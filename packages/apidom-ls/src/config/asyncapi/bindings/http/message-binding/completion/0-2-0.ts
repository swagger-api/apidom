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
        '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nA Schema object containing the definitions for HTTP-specific headers. This schema MUST be of type `object` and have a `properties` key.',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
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
        '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nA Schema object containing the definitions for HTTP-specific headers. This schema MUST be of type `object` and have a `properties` key.',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
];

export default completion;
