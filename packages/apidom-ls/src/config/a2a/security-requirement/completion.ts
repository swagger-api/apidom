import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { A2A1 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'schemes',
    insertText: 'schemes',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "Map of security scheme names to arrays of required scopes. Each key is a security scheme name from the Agent Card's `securitySchemes`, and each value is a list of required OAuth2 scopes (or an empty list if not applicable).",
    },
    targetSpecs: A2A1,
  },
];

export default completion;
