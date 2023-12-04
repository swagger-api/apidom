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
      value: 'A reference to a Link.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'operationRef',
    insertText: 'operationRef',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'A relative or absolute URI reference to an OAS operation. This field is mutually exclusive of the `operationId` field, and MUST point to an [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject). Relative `operationRef` values MAY be used to locate an existing [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject) in the OpenAPI definition.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'operationRef',
    insertText: 'operationRef',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'A relative or absolute URI reference to an OAS operation. This field is mutually exclusive of the `operationId` field, and MUST point to an [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject). Relative `operationRef` values MAY be used to locate an existing [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) in the OpenAPI definition. See the rules for resolving [Relative References](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#relativeReferencesURI).',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'operationId',
    insertText: 'operationId',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The name of an existing, resolvable OAS operation, as defined with a unique `operationId`. This field is mutually exclusive of the `operationRef` field.',
    },
    targetSpecs: OpenAPI3,
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
        'Map[`string`, Any &#124; [`{expression}`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#runtimeExpression)]\n\\\n\\\nA map representing parameters to pass to an operation as specified with `operationId` or identified via `operationRef`. The key is the parameter name to be used, whereas the value can be a constant or an expression to be evaluated and passed to the linked operation. The parameter name can be qualified using the [parameter location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterIn) `[{in}.]{name}` for operations that use the same parameter name in different locations (e.g. path.id).',
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
        'Map[`string`, Any &#124; [`{expression}`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#runtimeExpression)]\n\\\n\\\nA map representing parameters to pass to an operation as specified with `operationId` or identified via `operationRef`. The key is the parameter name to be used, whereas the value can be a constant or an expression to be evaluated and passed to the linked operation. The parameter name can be qualified using the [parameter location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn) `[{in}.]{name}` for operations that use the same parameter name in different locations (e.g. path.id).',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'requestBody',
    insertText: 'requestBody',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Any &#124; [`{expression}`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#runtimeExpression)\n\\\n\\\nA literal value or [`{expression}`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#runtimeExpression) to use as a request body when calling the target operation.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'requestBody',
    insertText: 'requestBody',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Any &#124; [`{expression}`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#runtimeExpression)\n\\\n\\\nA literal value or [`{expression}`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#runtimeExpression) to use as a request body when calling the target operation.',
    },
    targetSpecs: OpenAPI31,
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
        'A description of the link. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'server',
    insertText: 'server',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#serverObject)\n\\\n\\\nA server object to be used by the target operation.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'server',
    insertText: 'server',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)\n\\\n\\\nA server object to be used by the target operation.',
    },
    targetSpecs: OpenAPI31,
  },
];

export default completion;
