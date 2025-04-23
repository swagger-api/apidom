import { CompletionItemKind, InsertTextFormat } from 'vscode-languageserver-types';

import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: '$comment',
    insertText: '\\$comment',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        'This keyword reserves a location for comments from schema authors to readers or maintainers of the schema.\n\\\n\\\nThe value of this keyword MUST be a string. Implementations MUST NOT present this string to end users. Tools for editing schemas SHOULD support displaying and editing this keyword. The value of this keyword MAY be used in debug or error output which is intended for developers making use of schemas.',
    },
    targetSpecs: JSONSchema202012,
  },
];

export default completion;
