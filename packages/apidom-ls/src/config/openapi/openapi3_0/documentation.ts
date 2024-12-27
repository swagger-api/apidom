import { OpenAPI30 } from '../target-specs.ts';

/**
 * Omitted fixed fields:
 *  - info
 *  - paths
 *  - components
 *  - externalDocs
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */

const documentation = [
  {
    target: 'openapi',
    docs: '**REQUIRED**. This string MUST be the [semantic version number](https://semver.org/spec/v2.0.0.html) of the [OpenAPI Specification version](https://spec.openapis.org/oas/v3.0.4.html#versions) that the OpenAPI document uses. The `openapi` field SHOULD be used by tooling specifications and clients to interpret the OpenAPI document. This is *not* related to the API [`info.version`](https://spec.openapis.org/oas/v3.0.4.html#info-version) string',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'servers',
    docs: '[[Server Object](https://spec.openapis.org/oas/v3.0.4.html#server-object)]\n\\\n\\\nAn array of Server Objects, which provide connectivity information to a target server. If the `servers` property is not provided, or is an empty array, the default value would be a [Server Object](https://spec.openapis.org/oas/v3.0.4.html#server-object) with a [url](https://spec.openapis.org/oas/v3.0.4.html#server-url) value of `/`.',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'security',
    docs: '[[Security Requirement Object](https://spec.openapis.org/oas/v3.0.4.html#security-requirement-object)]\n\\\n\\\nA declaration of which security mechanisms can be used across the API. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. Individual operations can override this definition. To make security optional, an empty security requirement (`{}`) can be included in the array.',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'tags',
    docs: "[[Tag Object](https://spec.openapis.org/oas/v3.0.4.html#tag-object)]\n\\\n\\\nA list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](https://spec.openapis.org/oas/v3.0.4.html#operation-object) must be declared. The tags that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.",
    targetSpecs: OpenAPI30,
  },
  {
    docs: "#### [OpenAPI Object](https://spec.openapis.org/oas/v3.0.4.html#openapi-object)\n\nThis is the root object of the [OpenAPI description](https://spec.openapis.org/oas/v3.0.4.html#openapi-description).\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nopenapi | `string` | **REQUIRED**. This string MUST be the [semantic version number](https://semver.org/spec/v2.0.0.html) of the [OpenAPI Specification version](https://spec.openapis.org/oas/v3.0.4.html#versions) that the OpenAPI document uses. The `openapi` field SHOULD be used by tooling specifications and clients to interpret the OpenAPI document. This is *not* related to the API [`info.version`](https://spec.openapis.org/oas/v3.0.4.html#info-version) string.\ninfo | [Info Object](https://spec.openapis.org/oas/v3.0.4.html#info-object) | **REQUIRED**. Provides metadata about the API. The metadata MAY be used by tooling as required.\nservers | [[Server Object](https://spec.openapis.org/oas/v3.0.4.html#server-object)] | An array of Server Objects, which provide connectivity information to a target server. If the `servers` property is not provided, or is an empty array, the default value would be a [Server Object](https://spec.openapis.org/oas/v3.0.4.html#server-object) with a [url](https://spec.openapis.org/oas/v3.0.4.html#server-url) value of `/`.\npaths | [Paths Object](https://spec.openapis.org/oas/v3.0.4.html#paths-object) | **REQUIRED**. The available paths and operations for the API.\ncomponents | [Components Object](https://spec.openapis.org/oas/v3.0.4.html#components-object) | An element to hold various schemas for the specification.\nsecurity | [[Security Requirement Object](https://spec.openapis.org/oas/v3.0.4.html#security-requirement-object)] | A declaration of which security mechanisms can be used across the API. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. Individual operations can override this definition. To make security optional, an empty security requirement (`{}`) can be included in the array.\ntags | [[Tag Object](https://spec.openapis.org/oas/v3.0.4.html#tag-object)] | A list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](https://spec.openapis.org/oas/v3.0.4.html#operation-object) must be declared. The tags that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.\nexternalDocs | [External Documentation Object](https://spec.openapis.org/oas/v3.0.4.html#external-documentation-object) | Additional external documentation.\n\nThis object MAY be extended with [Specification Extensions](https://spec.openapis.org/oas/v3.0.4.html#specification-extensions).",
    targetSpecs: OpenAPI30,
  },
];

export default documentation;
