import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI32, OpenAPI3 } from '../target-specs.ts';

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
      value:
        'Allows for an external definition of this path item. The referenced structure MUST be in the format of a [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathItemObject). If there are conflicts between the referenced',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: '$ref',
    insertText: '\\$ref',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Allows for an external definition of this path item. The referenced structure MUST be in the format of a [Path Item Object](https://spec.openapis.org/oas/v3.0.4.html#path-item-object).  In case a Path Item Object field appears both in the defined object and the referenced object, the behavior is undefined.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: '$ref',
    insertText: '\\$ref',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A reference to a Path Item',
    },
    targetSpecs: [...OpenAPI31, ...OpenAPI32],
  },
  {
    label: 'summary',
    insertText: 'summary',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'An optional string summary, intended to apply to all operations in this path.',
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
        'An optional string description, intended to apply to all operations in this path. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'get',
    insertText: 'get',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#operationObject)\n\\\n\\\nA definition of a GET operation on this path.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'get',
    insertText: 'get',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://spec.openapis.org/oas/v3.0.4.html#operation-object)\n\\\n\\\nA definition of a GET operation on this path.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'get',
    insertText: 'get',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\\\n\\\nA definition of a GET operation on this path.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'get',
    insertText: 'get',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#operationObject)\n\\\n\\\nA definition of a GET operation on this path.',
    },
    targetSpecs: OpenAPI32,
  },
  {
    label: 'put',
    insertText: 'put',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://spec.openapis.org/oas/v3.0.4.html#operation-object)\n\\\n\\\nA definition of a PUT operation on this path.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'put',
    insertText: 'put',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#operationObject)\n\\\n\\\nA definition of a PUT operation on this path.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'put',
    insertText: 'put',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\\\n\\\nA definition of a PUT operation on this path.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'put',
    insertText: 'put',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#operationObject)\n\\\n\\\nA definition of a PUT operation on this path.',
    },
    targetSpecs: OpenAPI32,
  },
  {
    label: 'post',
    insertText: 'post',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#operationObject)\n\\\n\\\nA definition of a POST operation on this path.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'post',
    insertText: 'post',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://spec.openapis.org/oas/v3.0.4.html#operation-object)\n\\\n\\\nA definition of a POST operation on this path.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'post',
    insertText: 'post',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\\\n\\\nA definition of a POST operation on this path.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'post',
    insertText: 'post',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#operationObject)\n\\\n\\\nA definition of a POST operation on this path.',
    },
    targetSpecs: OpenAPI32,
  },
  {
    label: 'delete',
    insertText: 'delete',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#operationObject)\n\\\n\\\nA definition of a DELETE operation on this path.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'delete',
    insertText: 'delete',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://spec.openapis.org/oas/v3.0.4.html#operation-object)\n\\\n\\\nA definition of a DELETE operation on this path.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'delete',
    insertText: 'delete',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\\\n\\\nA definition of a DELETE operation on this path.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'delete',
    insertText: 'delete',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#operationObject)\n\\\n\\\nA definition of a DELETE operation on this path.',
    },
    targetSpecs: OpenAPI32,
  },
  {
    label: 'options',
    insertText: 'options',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#operationObject)\n\\\n\\\nA definition of a OPTIONS operation on this path.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'options',
    insertText: 'options',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://spec.openapis.org/oas/v3.0.4.html#operation-object)\n\\\n\\\nA definition of a OPTIONS operation on this path.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'options',
    insertText: 'options',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\\\n\\\nA definition of a OPTIONS operation on this path.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'options',
    insertText: 'options',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#operationObject)\n\\\n\\\nA definition of a OPTIONS operation on this path.',
    },
    targetSpecs: OpenAPI32,
  },
  {
    label: 'head',
    insertText: 'head',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#operationObject)\n\\\n\\\nA definition of a HEAD operation on this path.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'head',
    insertText: 'head',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://spec.openapis.org/oas/v3.0.4.html#operation-object)\n\\\n\\\nA definition of a HEAD operation on this path.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'head',
    insertText: 'head',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\\\n\\\nA definition of a HEAD operation on this path.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'head',
    insertText: 'head',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#operationObject)\n\\\n\\\nA definition of a HEAD operation on this path.',
    },
    targetSpecs: OpenAPI32,
  },
  {
    label: 'patch',
    insertText: 'patch',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#operationObject)\n\\\n\\\nA definition of a PATCH operation on this path.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'patch',
    insertText: 'patch',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://spec.openapis.org/oas/v3.0.4.html#operation-object)\n\\\n\\\nA definition of a PATCH operation on this path.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'patch',
    insertText: 'patch',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\\\n\\\nA definition of a PATCH operation on this path.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'patch',
    insertText: 'patch',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#operationObject)\n\\\n\\\nA definition of a PATCH operation on this path.',
    },
    targetSpecs: OpenAPI32,
  },
  {
    label: 'trace',
    insertText: 'trace',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://spec.openapis.org/oas/v3.0.4.html#operation-object)\n\\\n\\\nA definition of a TRACE operation on this path.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'trace',
    insertText: 'trace',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\\\n\\\nA definition of a TRACE operation on this path.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'trace',
    insertText: 'trace',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#operationObject)\n\\\n\\\nA definition of a TRACE operation on this path.',
    },
    targetSpecs: OpenAPI32,
  },
  {
    label: 'query',
    insertText: 'query',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Object](https://spec.openapis.org/oas/v3.2.0.html#operation-object)\n\\\n\\\nA definition of a QUERY operation on this path. QUERY method allows safely querying the state of a resource in an idempotent way using a query payload.',
    },
    targetSpecs: OpenAPI32,
  },
  {
    label: 'additionalOperations',
    insertText: 'additionalOperations',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Operation Object](https://spec.openapis.org/oas/v3.2.0.html#operation-object)]\n\\\n\\\nA map of HTTP methods you choose to include in your API design for non-standard methods. Each key must be a valid HTTP method name and each value must be an Operation Object.',
    },
    targetSpecs: OpenAPI32,
  },
  {
    label: 'servers',
    insertText: 'servers',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Server Object](https://spec.openapis.org/oas/v3.0.4.html#server-object)]\n\\\n\\\nAn alternative `server` array to service all operations in this path.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'servers',
    insertText: 'servers',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)]\n\\\n\\\nAn alternative `server` array to service all operations in this path.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'servers',
    insertText: 'servers',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#serverObject)]\n\\\n\\\nAn alternative `server` array to service all operations in this path.',
    },
    targetSpecs: OpenAPI32,
  },
  {
    label: 'parameters',
    insertText: 'parameters',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#referenceObject)]\n\\\n\\\nA list of parameters that are applicable for all the operations described under this path. These parameters can be overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterIn). The list can use the [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#referenceObject) to link to parameters that are defined at the [Swagger Object\'s parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#swaggerParameters). There can be one "body" parameter at most.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'parameters',
    insertText: 'parameters',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "[[Parameter](https://spec.openapis.org/oas/v3.0.4.html#parameter-object) &#124; [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object)]\n\\\n\\\nA list of parameters that are applicable for all the operations described under this path. These parameters can be overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://spec.openapis.org/oas/v3.0.4.html#parameter-name) and [location](https://spec.openapis.org/oas/v3.0.4.html#parameter-in). The list can use the [Reference Object](https://spec.openapis.org/oas/v3.0.4.html#reference-object) to link to parameters that are defined at the [OpenAPI Object's components/parameters](https://spec.openapis.org/oas/v3.0.4.html#components-parameters).",
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'parameters',
    insertText: 'parameters',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "[[Parameter](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nA list of parameters that are applicable for all the operations described under this path. These parameters can be overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn). The list can use the [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject) to link to parameters that are defined at the [OpenAPI Object's components/parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsParameters).",
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'parameters',
    insertText: 'parameters',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "[[Parameter](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#parameterObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#referenceObject)]\n\\\n\\\nA list of parameters that are applicable for all the operations described under this path. These parameters can be overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#parameterIn). The list can use the [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#referenceObject) to link to parameters that are defined at the [OpenAPI Object's components/parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#componentsParameters).",
    },
    targetSpecs: OpenAPI32,
  },
];

export default completion;
