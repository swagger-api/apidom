import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { A2A1 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'streaming',
    insertText: 'streaming',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Indicates if the agent supports streaming responses.',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'pushNotifications',
    insertText: 'pushNotifications',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Indicates if the agent supports sending push notifications for asynchronous task updates.',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'extendedAgentCard',
    insertText: 'extendedAgentCard',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Indicates if the agent supports providing an extended agent card when authenticated.',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'extensions',
    insertText: 'extensions',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A list of protocol extensions supported by the agent.',
    },
    targetSpecs: A2A1,
  },
];

export default completion;
