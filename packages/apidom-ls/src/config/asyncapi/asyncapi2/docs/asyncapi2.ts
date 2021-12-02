const asyncapi2Docs = [
  {
    target: 'asyncapi',
    docs: 'The version string signifies the version of the AsyncAPI Specification that the document complies to. The format for this string _must_ be `major`.`minor`.`patch`. The `patch` _may_ be suffixed by a hyphen and extra alphanumeric characters.\n\n ---- \n\nA `major`.`minor` shall be used to designate the AsyncAPI Specification version, and will be considered compatible with the AsyncAPI Specification specified by that `major`.`minor` version. The patch version will not be considered by tooling, making no distinction between `1.0.0` and `1.0.1`.\n\n ---- \n\nIn subsequent versions of the AsyncAPI Specification, care will be given such that increments of the `minor` version should not interfere with operations of tooling developed to a lower minor version. Thus a hypothetical `1.1.0` specification should be usable with tooling designed for `1.0.0`.\n\n',
  },
  {
    target: 'id',
    docs: 'This field represents a unique universal identifier of the [application](https://www.asyncapi.com/docs/specifications/v2.2.0#definitionsApplication) the AsyncAPI document is defining. It must conform to the URI format, according to [RFC3986](https://tools.ietf.org/html/rfc3986).\n\n ---- \n\nIt is **RECOMMENDED** to use a [URN](https://tools.ietf.org/html/rfc8141) to globally and uniquely identify the application during long periods of time, even after it becomes unavailable or ceases to exist.',
  },
  {
    target: 'info',
    docs: 'The object provides metadata about the API. The metadata can be used by the clients if needed.',
  },
  {
    target: 'servers',
    docs: 'The Servers Object is a map of [Server Objects](https://www.asyncapi.com/docs/specifications/v2.2.0#serverObject).',
  },
  {
    target: 'defaultContentType',
    docs: "A string representing the default content type to use when encoding/decoding a message's payload. The value **MUST** be a specific media type (e.g. `application/json`). This value **MUST** be used by schema parsers when the [contentType](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObjectContentType) property is omitted.",
  },
  {
    target: 'channels',
    docs: 'Holds the relative paths to the individual channel and their operations. Channel paths are relative to servers.\n\n ---- \n\nChannels are also known as "topics", "routing keys", "event types" or "paths".',
  },
  {
    target: 'components',
    docs: 'Holds a set of reusable objects for different aspects of the AsyncAPI specification. All objects defined within the components object will have no effect on the API unless they are explicitly referenced from properties outside the components object.',
  },
  {
    target: 'tags',
    docs: 'A list of tags used by the specification with additional metadata. Each tag name in the list **MUST** be unique.',
  },
];
export default asyncapi2Docs;
