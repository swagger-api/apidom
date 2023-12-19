import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';
import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

const completion: ApidomCompletionItem[] = [
  {
    label: 'tags',
    insertText: 'tags',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[`string`]\n\\\n\\\nA list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.',
    },
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
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
      value:
        'A short summary of what the operation does. For maximum readability in the swagger-ui, this field SHOULD be less than 120 characters.',
    },
    targetSpecs: OpenAPI2,
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
      value: 'A short summary of what the operation does.',
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
        'A verbose explanation of the operation behavior. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.',
    },
    targetSpecs: OpenAPI2,
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
        'A verbose explanation of the operation behavior. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'externalDocs',
    insertText: 'externalDocs',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[External Documentation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#externalDocumentationObject)\n\\\n\\\nAdditional external documentation for this operation.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'externalDocs',
    insertText: 'externalDocs',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[External Documentation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#externalDocumentationObject)\n\\\n\\\nAdditional external documentation for this operation.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'externalDocs',
    insertText: 'externalDocs',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[External Documentation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#externalDocumentationObject)\n\\\n\\\nAdditional external documentation for this operation.',
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
        'Unique string used to identify the operation. The id MUST be unique among all operations described in the API. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is recommended to follow common programming naming conventions.',
    },
    targetSpecs: OpenAPI2,
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
        'Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'consumes',
    insertText: 'consumes',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[`string`]\n\\\n\\\nA list of MIME types the operation can consume. This overrides the [`consumes`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#swaggerConsumes) definition at the Swagger Object. An empty value MAY be used to clear the global definition. Value MUST be as described under [Mime Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#mimeTypes).',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'produces',
    insertText: 'produces',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[`string`]\n\\\n\\\nA list of MIME types the operation can produce. This overrides the [`produces`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#swaggerProduces) definition at the Swagger Object. An empty value MAY be used to clear the global definition. Value MUST be as described under [Mime Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#mimeTypes).',
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
        '[[Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#referenceObject)]\n\\\n\\\nA list of parameters that are applicable for this operation. If a parameter is already defined at the [Path Item](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathItemParameters), the new definition will override it, but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterIn). The list can use the [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#referenceObject) to link to parameters that are defined at the [Swagger Object\'s parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#swaggerParameters). There can be one "body" parameter at most.',
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
        "[[Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject)]\n\\\n\\\nA list of parameters that are applicable for this operation. If a parameter is already defined at the [Path Item](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#pathItemParameters), the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterIn). The list can use the [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject) to link to parameters that are defined at the [OpenAPI Object's components/parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#componentsParameters).",
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
        "[[Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nA list of parameters that are applicable for this operation. If a parameter is already defined at the [Path Item](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemParameters), the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn). The list can use the [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject) to link to parameters that are defined at the [OpenAPI Object's components/parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsParameters).",
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
        '[Request Body Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#requestBodyObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject)\n\\\n\\\nThe request body applicable for this operation.  The `requestBody` is only supported in HTTP methods where the HTTP 1.1 specification [RFC7231](https://tools.ietf.org/html/rfc7231#section-4.3.1) has explicitly defined semantics for request bodies.  In other cases where the HTTP spec is vague, `requestBody` SHALL be ignored by consumers.',
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
        '[[Request Body Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#requestBodyObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nThe request body applicable for this operation. The requestBody is fully supported in HTTP methods where the HTTP 1.1 specification [RFC7231](https://tools.ietf.org/html/rfc7231#section-4.3.1) has explicitly defined semantics for request bodies. In other cases where the HTTP spec is vague (such as [GET](https://tools.ietf.org/html/rfc7231#section-4.3.1), [HEAD](https://tools.ietf.org/html/rfc7231#section-4.3.2) and [DELETE](https://tools.ietf.org/html/rfc7231#section-4.3.5)), `requestBody` is permitted but does not have well-defined semantics and SHOULD be avoided if possible.',
    },
    targetSpecs: OpenAPI31,
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
        '[Responses Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#responsesObject)\n\\\n\\\n**Required.** The list of possible responses as they are returned from executing this operation.',
    },
    targetSpecs: OpenAPI2,
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
        '[Responses Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#responsesObject)\n\\\n\\\n**REQUIRED**. The list of possible responses as they are returned from executing this operation.',
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
        '[Responses Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#responsesObject)\n\\\n\\\nThe list of possible responses as they are returned from executing this operation.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'schemes',
    insertText: 'schemes',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[`string`]\n\\\n\\\nThe transfer protocol for the operation. Values MUST be from the list: `"http"`, `"https"`, `"ws"`, `"wss"`. The value overrides the Swagger Object [`schemes`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#swaggerSchemes) definition.',
    },
    targetSpecs: OpenAPI2,
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
        'Map[`string`, [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#callbackObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject)]]\n\\\n\\\nA map of possible out-of band callbacks related to the parent operation. The key is a unique identifier for the Callback Object. Each value in the map is a [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#callbackObject) that describes a request that may be initiated by the API provider and the expected responses.',
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
        'Map[`string`, [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#callbackObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]]\n\\\n\\\nA map of possible out-of band callbacks related to the parent operation. The key is a unique identifier for the Callback Object. Each value in the map is a [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#callbackObject) that describes a request that may be initiated by the API provider and the expected responses.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'deprecated',
    insertText: 'deprecated',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\n\\\nDeclares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default value is `false`.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'deprecated',
    insertText: 'deprecated',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\n\\\nDeclares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default value is `false`.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'security',
    insertText: 'security',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#serverObject)]\n\\\n\\\nA declaration of which security schemes are applied for this operation. The list of values describes alternative security schemes that can be used (that is, there is a logical OR between the security requirements). This definition overrides any declared top-level [`security`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#swaggerSecurity). To remove a top-level security declaration, an empty array can be used.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'security',
    insertText: 'security',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#serverObject)]\n\\\n\\\nA declaration of which security mechanisms can be used for this operation. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. To make security optional, an empty security requirement (`{}`) can be included in the array. This definition overrides any declared top-level [`security`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasSecurity). To remove a top-level security declaration, an empty array can be used.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'security',
    insertText: 'security',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)]\n\\\n\\\nA declaration of which security mechanisms can be used for this operation. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. To make security optional, an empty security requirement (`{}`) can be included in the array. This definition overrides any declared top-level [`security`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasSecurity). To remove a top-level security declaration, an empty array can be used.',
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
        '[[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#serverObject)]\n\\\n\\\nAn alternative `server` array to service this operation. If an alternative `server` object is specified at the Path Item Object or Root level, it will be overridden by this value.',
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
        '[[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)]\n\\\n\\\nAn alternative `server` array to service this operation. If an alternative `server` object is specified at the Path Item Object or Root level, it will be overridden by this value.',
    },
    targetSpecs: OpenAPI31,
  },
];

export default completion;
