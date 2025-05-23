import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { OpenAPI3 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: '3.0.0',
    insertText: '3.0.0',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI3,
  },
  {
    label: '3.0.1',
    insertText: '3.0.1',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI3,
  },
  {
    label: '3.0.2',
    insertText: '3.0.2',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI3,
  },
  {
    label: '3.0.3',
    insertText: '3.0.3',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI3,
  },
  {
    label: '3.0.4',
    insertText: '3.0.4',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI3,
  },
  {
    label: '3.1.0',
    insertText: '3.1.0',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI3,
  },
];

export default completion;
