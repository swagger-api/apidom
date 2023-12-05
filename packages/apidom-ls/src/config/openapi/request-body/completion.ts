import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';
import { OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

const completion: ApidomCompletionItem[] = [
  {
    label: '$ref',
    insertText: '\\$ref',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A reference to a Request Body.',
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
        'A brief description of the request body. This could contain examples of use. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'content',
    insertText: 'content',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Media Type Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#mediaTypeObject)]\n\\\n\\\n**REQUIRED**. The content of the request body. The key is a media type or [media type range](https://tools.ietf.org/html/rfc7231#appendix-D) and the value describes it.  For requests that match multiple keys, only the most specific key is applicable. e.g. text/plain overrides text/*',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'content',
    insertText: 'content',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Media Type Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#mediaTypeObject)]\n\\\n\\\n**REQUIRED**. The content of the request body. The key is a media type or [media type range](https://tools.ietf.org/html/rfc7231#appendix-D) and the value describes it.  For requests that match multiple keys, only the most specific key is applicable. e.g. text/plain overrides text/*',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'required',
    insertText: 'required',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Determines if the request body is required in the request. Defaults to `false`.',
    },
    targetSpecs: OpenAPI3,
  },
];

export default completion;
