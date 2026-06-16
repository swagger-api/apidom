import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { A2A1 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'url',
    insertText: 'url',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The URL where this interface is available. Must be a valid absolute HTTPS URL in production.',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'protocolBinding',
    insertText: 'protocolBinding',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The protocol binding (e.g. `JSONRPC`, `GRPC`, `HTTP+JSON`).',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'protocolVersion',
    insertText: 'protocolVersion',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The version of the A2A protocol this interface exposes (e.g. `"1.0"`).',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'tenant',
    insertText: 'tenant',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Optional opaque tenant identifier for multi-tenant A2A endpoints.',
    },
    targetSpecs: A2A1,
  },
];

export default completion;
