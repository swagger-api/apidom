import { DocumentationMeta } from '../../../apidom-language-types';
import { OpenAPI2 } from '../target-specs';

/**
 * Omitted fixed fields:
 *  - definitions
 *  - parameters
 *  - responses
 *  - securityDefinitions
 *  - externalDocs
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */

const documentation: DocumentationMeta[] = [
  {
    target: 'swagger',
    docs: '**Required.** Specifies the Swagger Specification version being used. It can be used by the Swagger UI and other clients to interpret the API listing. The value MUST be `"2.0"`.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'info',
    docs: '[Info Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#infoObject)\n\\\n\\\n**Required.** Provides metadata about the API. The metadata can be used by the clients if needed.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'host',
    docs: 'The host (name or ip) serving the API. This MUST be the host only and does not include the scheme nor sub-paths. It MAY include a port. If the `host` is not included, the host serving the documentation is to be used (including the port). The `host` does not support [path templating](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathTemplating).',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'basePath',
    docs: 'The base path on which the API is served, which is relative to the [`host`](#swaggerHost). If it is not included, the API is served directly under the `host`. The value MUST start with a leading slash (`/`). The `basePath` does not support [path templating](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathTemplating).',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'schemes',
    docs: '[string]\n\\\n\\\nThe transfer protocol of the API. Values MUST be from the list: `"http"`, `"https"`, `"ws"`, `"wss"`. If the `schemes` is not included, the default scheme to be used is the one used to access the Swagger definition itself.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'consumes',
    docs: '[string]\n\\\n\\\nA list of MIME types the APIs can consume. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#mimeTypes).',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'produces',
    docs: '[string]\n\\\n\\\nA list of MIME types the APIs can produce. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#mimeTypes).',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'paths',
    docs: '[Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathsObject)\n\\\n\\\n**Required.** The available paths and operations for the API.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'security',
    docs: '[[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#securityRequirementObject)]\n\\\n\\\nA declaration of which security schemes are applied for the API as a whole. The list of values describes alternative security schemes that can be used (that is, there is a logical OR between the security requirements). Individual operations can override this definition.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'tags',
    docs: "[[Tag Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#tagObject)]\n\\\n\\\nA list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#operationObject) must be declared. The tags that are not declared may be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.",
    targetSpecs: OpenAPI2,
  },
];

export default documentation;
