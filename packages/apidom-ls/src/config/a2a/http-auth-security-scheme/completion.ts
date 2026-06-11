import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { A2A1 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'description',
    insertText: 'description',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'An optional description for the security scheme (string).',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'scheme',
    insertText: 'scheme',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The name of the HTTP Authentication scheme to be used in the Authorization header, as defined in RFC 7235 (e.g. "Bearer") (string, required).',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'bearerFormat',
    insertText: 'bearerFormat',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'A hint to the client to identify how the bearer token is formatted (e.g. "JWT") (string).',
    },
    targetSpecs: A2A1,
  },
];

export default completion;
