import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

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
        "Map[string, any]\\\n\\\nThe value of this field MUST validate against the [Message Object's headers](https://www.asyncapi.com/docs/reference/specification/v2.6.0##messageObjectHeaders) field.",
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
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
        "Map[string, any]\\\n\\\nThe value of this field MUST validate against the [Message Object's headers](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObjectHeaders) field.",
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'payload',
    insertText: 'payload',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "The value of this field MUST validate against the [Message Object's payload](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObjectPayload) field.",
    },
    targetSpecs: AsyncAPI2,
  },
  {
    label: 'payload',
    insertText: 'payload',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "The value of this field MUST validate against the [Message Object's payload](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObjectPayload) field.",
    },
    targetSpecs: AsyncAPI3,
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
      value: 'A machine-friendly name.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    label: 'summary',
    insertText: 'summary',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A short summary of what the example is about.',
    },
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
];

export default completion;
