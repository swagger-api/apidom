import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';
import { OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

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
        '**REQUIRED.** A URL to the target host. This URL supports Server Variables and MAY be relative, to indicate that the host location is relative to the location where the OpenAPI document is being served. Variable substitutions will be made when a variable is named in `{` brackets `}`.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'description',
    insertText: 'description',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'An optional string describing the host designated by the URL. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'variables',
    insertText: 'variables',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "Map[`string`, [Server Variable Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#serverVariableObject)]\n\\\n\\\nA map between a variable name and its value. The value is used for substitution in the server's URL template.",
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'variables',
    insertText: 'variables',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "Map[`string`, [Server Variable Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableObject)]\n\\\n\\\nA map between a variable name and its value. The value is used for substitution in the server's URL template.",
    },
    targetSpecs: OpenAPI31,
  },
];

export default completion;
