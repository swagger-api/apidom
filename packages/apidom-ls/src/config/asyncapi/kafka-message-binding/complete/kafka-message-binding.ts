import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../apidom-language-types';

const kafkaMessageBindingCompleteJson: ApidomCompletionItem[] = [
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
        '[Schema Object][schemaObject] \\| [AVRO Schema Object](https://avro.apache.org/docs/current/spec.html) | The message key. **NOTE**: You can also use the [reference object](https://asyncapi.io/docs/specifications/v2.1.0#referenceObject) way.',
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
      value: 'The version of this binding. If omitted, "latest" MUST be assumed.',
    },
  },
];

export default kafkaMessageBindingCompleteJson;
