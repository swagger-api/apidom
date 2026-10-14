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
    label: 'flows',
    insertText: 'flows',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'An object containing configuration information for the supported OAuth 2.0 flows (required).',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'oauth2MetadataUrl',
    insertText: 'oauth2MetadataUrl',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'URL to the OAuth2 authorization server metadata (RFC 8414). TLS is required (string).',
    },
    targetSpecs: A2A1,
  },
];

export default completion;
