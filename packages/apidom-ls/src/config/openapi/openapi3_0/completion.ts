import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { OpenAPI30 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'openapi',
    insertText: 'openapi',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**REQUIRED**. This string MUST be the [semantic version number](https://semver.org/spec/v2.0.0.html) of the [OpenAPI Specification version](https://spec.openapis.org/oas/v3.0.4.html#versions) that the OpenAPI document uses. The `openapi` field SHOULD be used by tooling specifications and clients to interpret the OpenAPI document. This is *not* related to the API [`info.version`](https://spec.openapis.org/oas/v3.0.4.html#info-version) string',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'info',
    insertText: 'info',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Info Object](https://spec.openapis.org/oas/v3.0.4.html#info-object)\n\\\n\\\n**REQUIRED**. Provides metadata about the API. The metadata MAY be used by tooling as required.',
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
        '[[Server Object](https://spec.openapis.org/oas/v3.0.4.html#server-object)]\n\\\n\\\nAn array of Server Objects, which provide connectivity information to a target server. If the `servers` property is not provided, or is an empty array, the default value would be a [Server Object](https://spec.openapis.org/oas/v3.0.4.html#server-object) with a [url](https://spec.openapis.org/oas/v3.0.4.html#server-url) value of `/`.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'paths',
    insertText: 'paths',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Paths Object](https://spec.openapis.org/oas/v3.0.4.html#paths-object)\n\\\n\\\n**REQUIRED**. The available paths and operations for the API.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'components',
    insertText: 'components',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Components Object](https://spec.openapis.org/oas/v3.0.4.html#components-object)\n\\\n\\\nAn element to hold various schemas for the specification.',
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
        '[[Security Requirement Object](https://spec.openapis.org/oas/v3.0.4.html#security-requirement-object)]\n\\\n\\\nA declaration of which security mechanisms can be used across the API. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. Individual operations can override this definition. To make security optional, an empty security requirement (`{}`) can be included in the array.',
    },
    targetSpecs: OpenAPI30,
  },
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
        "[[Tag Object](https://spec.openapis.org/oas/v3.0.4.html#tag-object)]\n\\\n\\\nA list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](https://spec.openapis.org/oas/v3.0.4.html#operation-object) must be declared. The tags that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.",
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
        '[External Documentation Object](https://spec.openapis.org/oas/v3.0.4.html#external-documentation-object)\n\\\n\\\nAdditional external documentation.',
    },
    targetSpecs: OpenAPI30,
  },
];

export default completion;
