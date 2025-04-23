import { CompletionItemKind, InsertTextFormat } from 'vscode-languageserver-types';

import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: '$schema',
    insertText: '\\$schema',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        'The "$schema" keyword is both used as a JSON Schema dialect identifier and as the identifier of a resource which is itself a JSON Schema, which describes the set of valid schemas written for this particular dialect.\n\\\n\\\nThe value of this keyword MUST be a [URI [RFC3986]](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01#RFC3986) (containing a scheme) and this URI MUST be normalized. The current schema MUST be valid against the meta-schema identified by this URI.',
    },
    targetSpecs: JSONSchema202012,
  },
  {
    target: '$schema',
    label: 'https://json-schema.org/draft/2020-12/schema',
    insertText: 'https://json-schema.org/draft/2020-12/schema',
    kind: CompletionItemKind.Value,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: InsertTextFormat.Snippet,
    targetSpecs: JSONSchema202012,
  },
];

export default completion;
