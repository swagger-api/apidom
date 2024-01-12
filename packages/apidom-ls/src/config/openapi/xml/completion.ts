import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';
import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

const completion: ApidomCompletionItem[] = [
  {
    label: 'name',
    insertText: 'name',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Replaces the name of the element/attribute used for the described schema property. When defined within the Items Object (`items`), it will affect the name of the individual XML elements within the list. When defined alongside `type` being `array` (outside the `items`), it will affect the wrapping element and only if `wrapped` is `true`. If `wrapped` is `false`, it will be ignored.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'name',
    insertText: 'name',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Replaces the name of the element/attribute used for the described schema property. When defined within `items`, it will affect the name of the individual XML elements within the list. When defined alongside `type` being `array` (outside the `items`), it will affect the wrapping element and only if `wrapped` is `true`. If `wrapped` is `false`, it will be ignored.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'namespace',
    insertText: 'namespace',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The URL of the namespace definition. Value SHOULD be in the form of a URL.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'namespace',
    insertText: 'namespace',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The URI of the namespace definition. This MUST be in the form of an absolute URI.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'prefix',
    insertText: 'prefix ',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The prefix to be used for the [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#xmlName).',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'prefix',
    insertText: 'prefix ',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The prefix to be used for the [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#xmlName).',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'prefix',
    insertText: 'prefix ',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The prefix to be used for the [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#xmlName).',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'attribute',
    insertText: 'attribute ',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Declares whether the property definition translates to an attribute instead of an element. Default value is `false`.',
    },
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'wrapped',
    insertText: 'wrapped ',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'MAY be used only for an array definition. Signifies whether the array is wrapped (for example, `<books><book/><book/></books>`) or unwrapped (`<book/><book/>`). Default value is `false`. The definition takes effect only when defined alongside `type` being `array` (outside the `items`).',
    },
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
];

export default completion;
