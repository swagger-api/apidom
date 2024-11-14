import { OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs.ts';

/**
 * Omitted fixed fields:
 *  - server
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */

const documentation = [
  {
    target: 'operationRef',
    docs: 'A relative or absolute URI reference to an OAS operation. This field is mutually exclusive of the `operationId` field, and MUST point to an [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject). Relative `operationRef` values MAY be used to locate an existing [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject) in the OpenAPI definition.',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'operationRef',
    docs: 'A relative or absolute URI reference to an OAS operation. This field is mutually exclusive of the `operationId` field, and MUST point to an [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject). Relative `operationRef` values MAY be used to locate an existing [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) in the OpenAPI definition. See the rules for resolving [Relative References](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#relativeReferencesURI).',
    targetSpecs: OpenAPI31,
  },
  {
    target: 'operationId',
    docs: 'The name of an existing, resolvable OAS operation, as defined with a unique `operationId`. This field is mutually exclusive of the `operationRef` field.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'parameters',
    docs: 'Map[`string`, Any &#124; [`{expression}`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#runtimeExpression)]\n\\\n\\\nA map representing parameters to pass to an operation as specified with `operationId` or identified via `operationRef`. The key is the parameter name to be used, whereas the value can be a constant or an expression to be evaluated and passed to the linked operation. The parameter name can be qualified using the [parameter location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterIn) `[{in}.]{name}` for operations that use the same parameter name in different locations (e.g. path.id).',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'parameters',
    docs: 'Map[`string`, Any &#124; [`{expression}`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#runtimeExpression)]\n\\\n\\\nA map representing parameters to pass to an operation as specified with `operationId` or identified via `operationRef`. The key is the parameter name to be used, whereas the value can be a constant or an expression to be evaluated and passed to the linked operation. The parameter name can be qualified using the [parameter location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn) `[{in}.]{name}` for operations that use the same parameter name in different locations (e.g. path.id).',
    targetSpecs: OpenAPI31,
  },
  {
    target: 'requestBody',
    docs: 'Any &#124; [`{expression}`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#runtimeExpression)\n\\\n\\\nA literal value or [`{expression}`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#runtimeExpression) to use as a request body when calling the target operation.',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'requestBody',
    docs: 'Any &#124; [`{expression}`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#runtimeExpression)\n\\\n\\\nA literal value or [`{expression}`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#runtimeExpression) to use as a request body when calling the target operation.',
    targetSpecs: OpenAPI31,
  },
  {
    target: 'description',
    docs: 'A description of the link. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    targetSpecs: OpenAPI3,
  },
  {
    docs: "#### [Link Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md)\n\nThe `Link object` represents a possible design-time link for a response.\nThe presence of a link does not guarantee the caller's ability to successfully invoke it, rather it provides a known relationship and traversal mechanism between responses and other operations.\n\nUnlike _dynamic_ links (i.e. links provided **in** the response payload), the OAS linking mechanism does not require link information in the runtime response.\n\nFor computing links, and providing instructions to execute them, a [runtime expression](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#runtimeExpression) is used for accessing values in an operation and using them as parameters while invoking the linked operation.\n\n##### Fixed Fields\n\nField Name  |  Type  | Description\n---|:---:|---\noperationRef | `string` | A relative or absolute URI reference to an OAS operation. This field is mutually exclusive of the `operationId` field, and MUST point to an [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject). Relative `operationRef` values MAY be used to locate an existing [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject) in the OpenAPI definition.\noperationId  | `string` | The name of an _existing_, resolvable OAS operation, as defined with a unique `operationId`.  This field is mutually exclusive of the `operationRef` field.\nparameters   | Map[`string`, Any \\| [{expression}](#runtimeExpression)] | A map representing parameters to pass to an operation as specified with `operationId` or identified via `operationRef`. The key is the parameter name to be used, whereas the value can be a constant or an expression to be evaluated and passed to the linked operation.  The parameter name can be qualified using the [parameter location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterIn) `[{in}.]{name}` for operations that use the same parameter name in different locations (e.g. path.id).\nrequestBody | Any \\| [{expression}](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#runtimeExpression) | A literal value or [{expression}](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#runtimeExpression) to use as a request body when calling the target operation.\ndescription  | `string` | A description of the link. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nserver       | [Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#serverObject) | A server object to be used by the target operation.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).\n\nA linked operation MUST be identified using either an `operationRef` or `operationId`.\nIn the case of an `operationId`, it MUST be unique and resolved in the scope of the OAS document.\nBecause of the potential for name clashes, the `operationRef` syntax is preferred\nfor specifications with external references.\n\n##### Examples\n\nComputing a link from a request operation where the `$request.path.id` is used to pass a request parameter to the linked operation.\n\n\n\\\nYAML\n```yaml\npaths:\n  /users/{id}:\n    parameters:\n    - name: id\n      in: path\n      required: true\n      description: the user identifier, as userId\n      schema:\n        type: string\n    get:\n      responses:\n        '200':\n          description: the user being returned\n          content:\n            application/json:\n              schema:\n                type: object\n                properties:\n                  uuid: # the unique user id\n                    type: string\n                    format: uuid\n          links:\n            address:\n              # the target link operationId\n              operationId: getUserAddress\n              parameters:\n                # get the `id` field from the request path parameter named `id`\n                userId: $request.path.id\n  # the path item of the linked operation\n  /users/{userid}/address:\n    parameters:\n    - name: userid\n      in: path\n      required: true\n      description: the user identifier, as userId\n      schema:\n        type: string\n    # linked operation\n    get:\n      operationId: getUserAddress\n      responses:\n        '200':\n          description: the user's address\n```\n\nWhen a runtime expression fails to evaluate, no parameter value is passed to the target operation.\n\nValues from the response body can be used to drive a linked operation.\n\n```yaml\nlinks:\n  address:\n    operationId: getUserAddressByUUID\n    parameters:\n      # get the `uuid` field from the `uuid` field in the response body\n      userUuid: $response.body#/uuid\n```\n\nClients follow all links at their discretion.\nNeither permissions, nor the capability to make a successful call to that link, is guaranteed\nsolely by the existence of a relationship.",
    targetSpecs: OpenAPI30,
  },
  {
    docs: "#### [Link Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#linkObject)\nThe `Link object` represents a possible design-time link for a response. The presence of a link does not guarantee the caller's ability to successfully invoke it, rather it provides a known relationship and traversal mechanism between responses and other operations.\n\n\\\nUnlike *dynamic* links (i.e.links provided in the response payload), the OAS linking mechanism does not require link information in the runtime response.\n\n\\\nFor computing links, and providing instructions to execute them, a [runtime expression](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#runtimeExpression) is used for accessing values in an operation and using them as parameters while invoking the linked operation.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\noperationRef | `string` | A relative or absolute URI reference to an OAS operation. This field is mutually exclusive of the `operationId` field, and MUST point to an [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject). Relative `operationRef` values MAY be used to locate an existing [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) in the OpenAPI definition. See the rules for resolving [Relative References](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#relativeReferencesURI).\noperationId | `string` | The name of an existing, resolvable OAS operation, as defined with a unique `operationId`. This field is mutually exclusive of the `operationRef` field.\nparameters | Map[`string`, Any &#124; [`{expression}`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#runtimeExpression)] | A map representing parameters to pass to an operation as specified with `operationId` or identified via `operationRef`. The key is the parameter name to be used, whereas the value can be a constant or an expression to be evaluated and passed to the linked operation. The parameter name can be qualified using the [parameter location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn) `[{in}.]{name}` for operations that use the same parameter name in different locations (e.g. path.id).\nrequestBody | Any &#124; [`{expression}`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#runtimeExpression) | A literal value or [`{expression}`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#runtimeExpression) to use as a request body when calling the target operation.\ndescription | `string` | A description of the link. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nserver | [Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject) | A server object to be used by the target operation.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n\\\nA linked operation MUST be identified using either an `operationRef` or `operationId`. In the case of an `operationId`, it MUST be unique and resolved in the scope of the OAS document. Because of the potential for name clashes, the `operationRef` syntax is preferred for OpenAPI documents with external references.\n\n##### Examples\n\nComputing a link from a request operation where the `$request.path.id` is used to pass a request parameter to the linked operation.\n\n\\\nYAML\n```yaml\npaths:\n  /users/{id}:\n    parameters:\n    - name: id\n      in: path\n      required: true\n      description: the user identifier, as userId \n      schema:\n        type: string\n    get:\n      responses:\n        '200':\n          description: the user being returned\n          content:\n            application/json:\n              schema:\n                type: object\n                properties:\n                  uuid: # the unique user id\n                    type: string\n                    format: uuid\n          links:\n            address:\n              # the target link operationId\n              operationId: getUserAddress\n              parameters:\n                # get the `id` field from the request path parameter named `id`\n                userId: $request.path.id\n  # the path item of the linked operation\n  /users/{userid}/address:\n    parameters:\n    - name: userid\n      in: path\n      required: true\n      description: the user identifier, as userId \n      schema:\n        type: string\n    # linked operation\n    get:\n      operationId: getUserAddress\n      responses:\n        '200':\n          description: the user's address\n```\n\n\\\nWhen a runtime expression fails to evaluate, no parameter value is passed to the target operation.\n\n\\\nValues from the response body can be used to drive a linked operation.\n\n\\\nYAML\n```yaml\nlinks:\n  address:\n    operationId: getUserAddressByUUID\n    parameters:\n      # get the `uuid` field from the `uuid` field in the response body\n      userUuid: $response.body#/uuid\n```\n\n##### OperationRef Examples\n\nAs references to `operationId` MAY NOT be possible (the operationId is an optional field in an [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)), references MAY also be made through a relative `operationRef`:\n\n\\\nYAML\n```yaml\nlinks:\n  UserRepositories:\n    # returns array of '#/components/schemas/repository'\n    operationRef: '#/paths/~12.0~1repositories~1{username}/get'\n    parameters:\n      username: $response.body#/username\n```\n\n\\\nor an absolute `operationRef`:\n\n\\\nYAML\n```yaml\nlinks:\n  UserRepositories:\n    # returns array of '#/components/schemas/repository'\n    operationRef: 'https://na2.gigantic-server.com/#/paths/~12.0~1repositories~1{username}/get'\n    parameters:\n      username: $response.body#/username\n```\n\n\\\nNote that in the use of `operationRef`, the *escaped forward-slash* is necessary when using JSON references.",
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
