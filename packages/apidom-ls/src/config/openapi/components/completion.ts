import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { OpenAPI30, OpenAPI31, OpenAPI32 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'schemas',
    insertText: 'schemas',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Schema Object](https://spec.openapis.org/oas/v3.0.4.html#schema-object) \\| [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)]\n\\\n\\\nAn object to hold reusable [Schema Objects](https://spec.openapis.org/oas/v3.0.4.html#schema-object).',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'schemas',
    insertText: 'schemas',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)]\n\\\n\\\nAn object to hold reusable [Schema Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject).',
    },
    targetSpecs: [...OpenAPI31, ...OpenAPI32],
  },
  {
    label: 'responses',
    insertText: 'responses',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Response Object](https://spec.openapis.org/oas/v3.0.4.html#response-object) &#124; [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)]\n\\\n\\\nAn object to hold reusable [Response Objects](https://spec.openapis.org/oas/v3.0.4.html#response-object).',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'responses',
    insertText: 'responses',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Response Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#responseObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nAn object to hold reusable [Response Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#responseObject).',
    },
    targetSpecs: [...OpenAPI31, ...OpenAPI32],
  },
  {
    label: 'parameters',
    insertText: 'parameters',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Parameter Object](https://spec.openapis.org/oas/v3.0.4.html#parameter-object) &#124; [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)]\n\\\n\\\nAn object to hold reusable [Parameter Objects](https://spec.openapis.org/oas/v3.0.4.html#parameter-object).',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'parameters',
    insertText: 'parameters',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nAn object to hold reusable [Parameter Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject).',
    },
    targetSpecs: [...OpenAPI31, ...OpenAPI32],
  },
  {
    label: 'examples',
    insertText: 'examples',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Example Object](https://spec.openapis.org/oas/v3.0.4.html#example-object) &#124; [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)]\n\\\n\\\nAn object to hold reusable [Example Objects](https://spec.openapis.org/oas/v3.0.4.html#example-object).',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'examples',
    insertText: 'examples',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#exampleObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nAn object to hold reusable [Example Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#exampleObject).',
    },
    targetSpecs: [...OpenAPI31, ...OpenAPI32],
  },
  {
    label: 'requestBodies',
    insertText: 'requestBodies',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Request Body Object](https://spec.openapis.org/oas/v3.0.4.html#request-body-object) &#124; [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)]\n\\\n\\\nAn object to hold reusable [Request Body Objects](https://spec.openapis.org/oas/v3.0.4.html#request-body-object).',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'requestBodies',
    insertText: 'requestBodies',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Request Body Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#requestBodyObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nAn object to hold reusable [Request Body Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#requestBodyObject).',
    },
    targetSpecs: [...OpenAPI31, ...OpenAPI32],
  },
  {
    label: 'headers',
    insertText: 'headers',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Header Object](https://spec.openapis.org/oas/v3.0.4.html#header-object) &#124; [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)]\n\\\n\\\nAn object to hold reusable [Header Objects](https://spec.openapis.org/oas/v3.0.4.html#header-object).',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'headers',
    insertText: 'headers',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Header Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#headerObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nAn object to hold reusable [Header Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#headerObject).',
    },
    targetSpecs: [...OpenAPI31, ...OpenAPI32],
  },
  {
    label: 'securitySchemes',
    insertText: 'securitySchemes',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Security Scheme Object](https://spec.openapis.org/oas/v3.0.4.html#security-scheme-object) &#124; [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)]\n\\\n\\\nAn object to hold reusable [Security Scheme Objects](https://spec.openapis.org/oas/v3.0.4.html#security-scheme-object).',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'securitySchemes',
    insertText: 'securitySchemes',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Security Scheme Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#securitySchemeObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nAn object to hold reusable [Security Scheme Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#securitySchemeObject).',
    },
    targetSpecs: [...OpenAPI31, ...OpenAPI32],
  },
  {
    label: 'links',
    insertText: 'links',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Link Object](https://spec.openapis.org/oas/v3.0.4.html#link-object) &#124; [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)]\n\\\n\\\nAn object to hold reusable [Link Objects](https://spec.openapis.org/oas/v3.0.4.html#link-object).',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'links',
    insertText: 'links',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Link Object](https://spec.openapis.org/oas/v3.0.4.html#link-object) &#124; [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)]\n\\\n\\\nAn object to hold reusable [Link Objects](https://spec.openapis.org/oas/v3.0.4.html#link-object).',
    },
    targetSpecs: [...OpenAPI31, ...OpenAPI32],
  },
  {
    label: 'callbacks',
    insertText: 'callbacks',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Callback Object](https://spec.openapis.org/oas/v3.0.4.html#callback-object) &#124; [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)]\n\\\n\\\nAn object to hold reusable [Callback Objects](https://spec.openapis.org/oas/v3.0.4.html#callback-object).',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'callbacks',
    insertText: 'callbacks',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#callbackObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nAn object to hold reusable [Callback Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#callbackObject).',
    },
    targetSpecs: [...OpenAPI31, ...OpenAPI32],
  },
  {
    label: 'pathItems',
    insertText: 'pathItems',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nAn object to hold reusable [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemObject).',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'pathItems',
    insertText: 'pathItems',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#pathItemObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#referenceObject)]\n\\\n\\\nAn object to hold reusable [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#pathItemObject).',
    },
    targetSpecs: OpenAPI32,
  },
  {
    label: 'mediaTypes',
    insertText: 'mediaTypes',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Media Type Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#mediaTypeObject)]\n\\\n\\\nAn object to hold reusable [Media Type Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#mediaTypeObject).',
    },
    targetSpecs: OpenAPI32,
  },
];

export default completion;
