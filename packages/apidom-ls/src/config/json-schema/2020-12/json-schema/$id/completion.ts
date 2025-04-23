import { CompletionItemKind, InsertTextFormat } from 'vscode-languageserver-types';

import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: '$id',
    insertText: '\\$id',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        'The "$id" keyword identifies a schema resource with its canonical [RFC6596] URI.\n\\\n\\\nNote that this URI is an identifier and not necessarily a network locator. In the case of a network-addressable URL, a schema need not be downloadable from its canonical URI.',
    },
    targetSpecs: JSONSchema202012,
  },
];

export default completion;
