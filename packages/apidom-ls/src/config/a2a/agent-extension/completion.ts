import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { A2A1 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'uri',
    insertText: 'uri',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The unique URI identifying the extension (string).',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'description',
    insertText: 'description',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A human-readable description of how this agent uses the extension (string).',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'required',
    insertText: 'required',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "If true, the client must understand and comply with the extension's requirements (boolean).",
    },
    targetSpecs: A2A1,
  },
  {
    label: 'params',
    insertText: 'params',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Optional extension-specific configuration parameters (object).',
    },
    targetSpecs: A2A1,
  },
];

export default completion;
