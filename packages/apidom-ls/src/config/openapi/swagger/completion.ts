import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';
import { OpenAPI2 } from '../target-specs';

const completion: ApidomCompletionItem[] = [
  {
    label: 'swagger',
    insertText: 'swagger',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**Required.** Specifies the Swagger Specification version being used. It can be used by the Swagger UI and other clients to interpret the API listing. The value MUST be `"2.0"`.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'info',
    insertText: 'info',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Info Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#infoObject)\n\\\n\\\n**Required.** Provides metadata about the API. The metadata can be used by the clients if needed.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'host',
    insertText: 'host',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The host (name or ip) serving the API. This MUST be the host only and does not include the scheme nor sub-paths. It MAY include a port. If the `host` is not included, the host serving the documentation is to be used (including the port). The `host` does not support [path templating](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathTemplating).',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'basePath',
    insertText: 'basePath',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The base path on which the API is served, which is relative to the [`host`](#swaggerHost). If it is not included, the API is served directly under the `host`. The value MUST start with a leading slash (`/`). The `basePath` does not support [path templating](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathTemplating).',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'schemes',
    insertText: 'schemes',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[string]\n\\\n\\\nThe transfer protocol of the API. Values MUST be from the list: `"http"`, `"https"`, `"ws"`, `"wss"`. If the `schemes` is not included, the default scheme to be used is the one used to access the Swagger definition itself.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'consumes',
    insertText: 'consumes',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[string]\n\\\n\\\nA list of MIME types the APIs can consume. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#mimeTypes).',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'produces',
    insertText: 'produces',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[string]\n\\\n\\\nA list of MIME types the APIs can produce. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#mimeTypes).',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'paths',
    insertText: 'paths',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathsObject)\n\\\n\\\n**Required.** The available paths and operations for the API.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'definitions',
    insertText: 'definitions',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Definitions Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#definitionsObject)\n\\\n\\\nAn object to hold data types produced and consumed by operations.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'parameters',
    insertText: 'parameters',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Parameters Definitions Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parametersDefinitionsObject)\n\\\n\\\nAn object to hold parameters that can be used across operations. This property does not define global parameters for all operations.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'responses',
    insertText: 'responses',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Responses Definitions Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#responsesDefinitionsObject)\n\\\n\\\nAn object to hold responses that can be used across operations. This property does not define global responses for all operations.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'securityDefinitions',
    insertText: 'securityDefinitions',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Security Definitions Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#securityDefinitionsObject)\n\\\n\\\nSecurity scheme definitions that can be used across the specification.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'security',
    insertText: 'security',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#securityRequirementObject)]\n\\\n\\\nA declaration of which security schemes are applied for the API as a whole. The list of values describes alternative security schemes that can be used (that is, there is a logical OR between the security requirements). Individual operations can override this definition.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'tags',
    insertText: 'tags',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "[[Tag Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#tagObject)]\n\\\n\\\nA list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#operationObject) must be declared. The tags that are not declared may be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.",
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'externalDocs',
    insertText: 'externalDocs',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#externalDocumentationObject)\n\\\n\\\nAdditional external documentation.',
    },
    targetSpecs: OpenAPI2,
  },
];

export default completion;
