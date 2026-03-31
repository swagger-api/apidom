import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'key',
    insertText: 'key',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [AVRO Schema Object](https://avro.apache.org/docs/current/spec.html)\n\\\n\\\n The message key. **NOTE**: You can also use the [reference object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) way.',
    },
    targetSpecs: AsyncAPI2,
  },
  {
    label: 'key',
    insertText: 'key',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [AVRO Schema Object](https://avro.apache.org/docs/current/spec.html)\n\\\n\\\n The message key. **NOTE**: You can also use the [reference object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) way.',
    },
    targetSpecs: AsyncAPI3,
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
      value: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.5.0" MUST be assumed.',
    },
  },
];

export default completion;
