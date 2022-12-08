import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'enum',
    insertText: 'enum',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'An enumeration of string values to be used if the substitution options are from a limited set. The array SHOULD NOT be empty.',
    },
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    label: 'enum',
    insertText: 'enum',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'An enumeration of string values to be used if the substitution options are from a limited set. The array MUST NOT be empty.',
    },
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    label: 'default',
    insertText: 'default',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "**REQUIRED.** The default value to use for substitution, which SHALL be sent if an alternate value is *not* supplied. Note this behavior is different than the [Schema Object's](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject) treatment of default values, because in those cases parameter values are optional.If the [`enum`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#serverVariableEnum) is defined, the value SHOULD exist in the enum's values.",
    },
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    label: 'default',
    insertText: 'default',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "**REQUIRED.** The default value to use for substitution, which SHALL be sent if an alternate value is *not* supplied. Note this behavior is different than the [Schema Object's](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) treatment of default values, because in those cases parameter values are optional.If the [`enum`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableEnum) is defined, the value MUST exist in the enum's values.",
    },
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
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
        'An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    },
  },
];

export default completion;
