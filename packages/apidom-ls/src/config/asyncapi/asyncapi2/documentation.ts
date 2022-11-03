/**
 * Omitted fixed fields:
 *  - asyncapi
 *  - id
 *  - info
 *  - servers
 *  - defaultContentType
 *  - channels
 *  - components
 *  - tags
 *  - externalDocs
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */

const documentation = [
  {
    docs: "#### [AsyncAPI Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0)\n\nThis is the root document object for the API specification.\nIt combines resource listing and API declaration together into one document.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nasyncapi | [AsyncAPI Version String](#A2SVersionString) | **REQUIRED.** Specifies the AsyncAPI Specification version being used. It can be used by tooling Specifications and clients to interpret the version. The structure shall be `major`.`minor`.`patch`, where `patch` versions _must_ be compatible with the existing `major`.`minor` tooling. Typically patch versions will be introduced to address errors in the documentation, and tooling should typically be compatible with the corresponding `major`.`minor` (1.0.*). Patch versions will correspond to patches of this document.\nid | [Identifier](https://www.asyncapi.com/docs/reference/specification/v2.5.0#A2SIdString) | Identifier of the [application](https://www.asyncapi.com/docs/reference/specification/v2.5.0#definitionsApplication) the AsyncAPI document is defining.\ninfo | [Info Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#infoObject) | **REQUIRED.** Provides metadata about the API. The metadata can be used by the clients if needed.\nservers | [Servers Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#serversObject) | Provides connection details of servers.\ndefaultContentType | [Default Content Type](https://www.asyncapi.com/docs/reference/specification/v2.5.0#defaultContentTypeString) | Default content type to use when encoding/decoding a message's payload.\nchannels | [Channels Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#channelsObject) | **REQUIRED** The available channels and messages for the API.\ncomponents | [Components Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#componentsObject) | An element to hold various schemas for the specification.\ntags | [Tags Object](#tagsObject) | A list of tags used by the specification with additional metadata. Each tag name in the list MUST be unique.\nexternalDocs | [External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#externalDocumentationObject) | Additional external documentation.\n\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.5.0#specificationExtensions).",
  },
];

export default documentation;
