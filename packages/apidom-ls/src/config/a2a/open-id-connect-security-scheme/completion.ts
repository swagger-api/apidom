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
    label: 'openIdConnectUrl',
    insertText: 'openIdConnectUrl',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "The OpenID Connect Discovery URL for the OIDC provider's metadata (string, required).",
    },
    targetSpecs: A2A1,
  },
];

export default completion;
