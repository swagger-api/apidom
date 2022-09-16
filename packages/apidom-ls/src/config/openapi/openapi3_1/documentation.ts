const documentation = [
  {
    target: 'openapi',
    docs: '`string`\n\\\n\\\n**REQUIRED**. This string MUST be the [version number](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#versions) of the OpenAPI Specification that the OpenAPI document uses. The `openapi` field SHOULD be used by tooling to interpret the OpenAPI document. This is *not* related to the API [`info.version`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#infoVersion) string.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'jsonSchemaDialect',
    docs: '`string`\n\\\n\\\nThe default value for the `$schema` keyword within [Schema Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) contained within this OAS document. This MUST be in the form of a URI.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'webhooks',
    docs: 'Map[`string`, [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nThe incoming webhooks that MAY be received as part of this API and that the API consumer MAY choose to implement. Closely related to the `callbacks` feature, this section describes requests initiated other than by an API call, for example by an out of band registration. The key name is a unique string to refer to each webhook, while the (optionally referenced) Path Item Object describes a request that may be initiated by the API provider and the expected responses. An [example](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.1/webhook-example.yaml) is available.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'security',
    docs: '#### [[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#securityRequirementObject)]\n\\\n\\\nA declaration of which security mechanisms can be used across the API. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. Individual operations can override this definition. To make security optional, an empty security requirement ({}) can be included in the array.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'servers',
    docs: '#### [[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)]\n\\\n\\\nAn array of Server Objects, which provide connectivity information to a target server. If the `servers` property is not provided, or is an empty array, the default value would be a [Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject) with a [url](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverUrl) value of `/`.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'tags',
    docs: "#### [[Tag Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#tagObject)]\n\\\n\\\nA list of tags used by the document with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) must be declared. The tags that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.",
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  /**
   * The following Fixed Fields are provided as reference, but are more
   * comprehensively described by their respective meta documentation
   */
  // {
  //   target: 'info',
  //   docs: '#### [Info Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#infoObject)\n\n**REQUIRED**. Provides metadata about the API. The metadata MAY be used by tooling as required.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  // {
  //   target: 'paths',
  //   docs: '#### [Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathsObject)\n\nThe available paths and operations for the API.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  // {
  //   target: 'components',
  //   docs: '#### [Components Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsObject)\n\nAn element to hold various schemas for the document.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
  // {
  //   target: 'externalDocs',
  //   docs: '#### [External Dcoumentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#externalDocumentationObject)\n\nAdditional external documentation.',
  //   targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  // },
];

export default documentation;
