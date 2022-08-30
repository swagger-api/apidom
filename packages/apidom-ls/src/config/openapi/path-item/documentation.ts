const docsPathItemObject =
  '#### [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemObject)\n\nDescribes the operations available on a single path. A Path Item MAY be empty, due to [ACL constraints](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#securityFiltering). The path itself is still exposed to the documentation viewer but they will not know which operations and parameters are available\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n$ref | `string` | Allows for a referenced definition of this path item. The referenced structure MUST be in the form of a [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemObject). In case a Path Item Object field appears both in the defined object and the referenced object, the behavior is undefined. See the rules for resolving [Relative References](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#relativeReferencesURI).\nsummary | `string` | An optional, string summary, intended to apply to all operations in this path.\ndescription | `string` | A description of the API. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\tget | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a GET operation on this path.\nput | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a PUT operation on this path.\npost | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a POST operation on this path.\ndelete | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a DELETE operation on this path.\noptions | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a OPTIONS operation on this path.\nhead | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a HEAD operation on this path.\npatch | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a PATCH operation on this path.\nget | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a GET operation on this path.\ntrace | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) | A definition of a TRACE operation on this path.\nservers | [[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)] | An alternative `server` array to service all operations in this path.\nparamenters | [[Parameter](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)] | A list of parameters that are applicable for all the operations described under this path. These parameters can be overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn). The list can use the [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject) to link to parameters that are defined at the [OpenAPI Object\'s components/parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsParameters).\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Paths Object Example\n\n\n\\\nJSON\n```json\n{\n  "get": {\n    "description": "Returns pets based on ID",\n    "summary": "Find pets by ID",\n    "operationId": "getPetsById",\n    "responses": {\n      "200": {\n        "description": "pet response",\n        "content": {\n          "*/*": {\n            "schema": {\n              "type": "array",\n              "items": {\n                "$ref": "#/components/schemas/Pet"\n              }\n            }\n          }\n        }\n      },\n      "default": {\n        "description": "error payload",\n        "content": {\n          "text/html": {\n            "schema": {\n              "$ref": "#/components/schemas/ErrorModel"\n            }\n          }\n        }\n      }\n    }\n  },\n  "parameters": [\n    {\n      "name": "id",\n      "in": "path",\n      "description": "ID of pet to use",\n      "required": true,\n      "schema": {\n        "type": "array",\n        "items": {\n          "type": "string"\n        }\n      },\n      "style": "simple"\n    }\n  ]\n}\n```\n\n\n\\\nYAML\n```yaml\nget:\n  description: Returns pets based on ID\n  summary: Find pets by ID\n  operationId: getPetsById\n  responses:\n    \'200\':\n      description: pet response\n      content:\n        \'*/*\' :\n          schema:\n          type: array\n          items:\n            $ref: \'#/components/schemas/Pet\'\n    default:\n      description: error payload\n      content:\n        \'text/html\':\n        schema:\n          $ref: \'#/components/schemas/ErrorModel\'\nparameters:\n- name: id\n  in: path\n  description: ID of pet to use\n  required: true\n  schema:\n    type: array\n    items:\n      type: string\n  style: simple\n```\n';

const docsOperationObject =
  '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nDescribes a single API operation on a path.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ntags | [`string`] | A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.\nsummary | `string` | A short summary of what the operation does.\ndescription | `string` | A verbose explanation of the operation behavior. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\texternalDocs | [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#externalDocumentationObject) | Additional external documentation for this operation.\noperationId | `string` | Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.\nparameters | [[Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)] | A list of parameters that are applicable for this operation. If a parameter is already defined at the [Path Item](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemParameters), the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn). The list can use the [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject) to link to parameters that are defined at the [OpenAPI Object\'s components/parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsParameters).\requestBody | [[Request Body Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#requestBodyObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)] | The request body applicable for this operation. The requestBody is fully supported in HTTP methods where the HTTP 1.1 specification [RFC7231](https://tools.ietf.org/html/rfc7231#section-4.3.1) has explicitly defined semantics for request bodies. In other cases where the HTTP spec is vague (such as [GET](https://tools.ietf.org/html/rfc7231#section-4.3.1), [HEAD](https://tools.ietf.org/html/rfc7231#section-4.3.2) and [DELETE](https://tools.ietf.org/html/rfc7231#section-4.3.5)), `requestBody` is permitted but does not have well-defined semantics and SHOULD be avoided if possible.\responses | [Responses Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#responsesObject) | The list of possible responses as they are returned from executing this operation.\ncallbacks | Map[`string`, [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#callbackObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]] | A map of possible out-of band callbacks related to the parent operation. The key is a unique identifier for the Callback Object. Each value in the map is a [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#callbackObject) that describes a request that may be initiated by the API provider and the expected responses.\ndeprecated |`boolean` | Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default value is `false`.\nsecurity | [[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)] | A declaration of which security mechanisms can be used for this operation. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. To make security optional, an empty security requirement (`{}`) can be included in the array. This definition overrides any declared top-level [`security`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasSecurity). To remove a top-level security declaration, an empty array can be used.\nservers | [[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)] | An alternative server array to service this operation. If an alternative server object is specified at the Path Item Object or Root level, it will be overridden by this value.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Operation Object Example\n\n\n\\\nJSON\n```json\n{\n  "tags": [\n    "pet"\n  ],\n  "summary": "Updates a pet in the store with form data",\n  "operationId": "updatePetWithForm",\n  "parameters": [\n    {\n      "name": "petId",\n      "in": "path",\n      "description": "ID of pet that needs to be updated",\n      "required": true,\n      "schema": {\n        "type": "string"\n      }\n    }\n  ],\n  "requestBody": {\n    "content": {\n      "application/x-www-form-urlencoded": {\n        "schema": {\n          "type": "object",\n          "properties": {\n            "name": {\n              "description": "Updated name of the pet",\n              "type": "string"\n            },\n            "status": {\n              "description": "Updated status of the pet",\n              "type": "string"\n            }\n          },\n          "required": ["status"]\n        }\n      }\n    }\n  },\n  "responses": {\n    "200": {\n      "description": "Pet updated.",\n        "content": {\n        "application/json": {},\n        "application/xml": {}\n      }\n    },\n    "405": {\n      "description": "Method Not Allowed",\n        "content": {\n        "application/json": {},\n        "application/xml": {}\n      }\n    }\n  },\n  "security": [\n    {\n      "petstore_auth": [\n        "write:pets",\n        "read:pets"\n      ]\n    }\n  ]\n}\n```\n\n\n\\\nYAML\n```yaml\ntags:\n- pet\nsummary: Updates a pet in the store with form data\noperationId: updatePetWithForm\nparameters:\n- name: petId\n  in: path\n  description: ID of pet that needs to be updated\n  required: true\n  schema:\n    type: string\nrequestBody:\n  content:\n    \'application/x-www-form-urlencoded\':\n      schema:\n        type: object\n        properties:\n          name:\n            description: Updated name of the pet\n            type: string\n          status:\n            description: Updated status of the pet\n            type: string\n        required:\n          - status\nresponses:\n  \'200\':\n    description: Pet updated.\n    content:\n      \'application/json\': {}\n      \'application/xml\': {}\n  \'405\':\n    description: Method Not Allowed\n    content:\n      \'application/json\': {}\n      \'application/xml\': {}\nsecurity:\n- petstore_auth:\n  - write: pets\n  - read:pets\n```\n';

const docsServersObject =
  '#### [Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)\n\nAn alternative `server` array to service all operations in this path.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nurl | [`string`] | **REQUIRED**. A URL to the target host. This URL supports Server Variables and MAY be relative, to indicate that the host location is relative to the location where the OpenAPI document is being served. Variable substitutions will be made when a variable is named in {brackets}.\ndescription | `string` | An optional string describing the host designated by the URL. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nvariables | Map[`string`, [Server Variable Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableObject)] | A map between a variable name and its value. The value is used for substitution in the server URL template.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Server Object Example\n\n\n\\\nA single server would be described as:\n\n\\\nJSON\n```json\n{\n  "url": "https://development.gigantic-server.com/v1",\n  "description": "Development server"\n}\n```\n\n\n\\\nYAML\n```yaml\nurl: https://development.gigantic-server.com/v1\ndescription: Development server\n```\n\n\\\nThe following shows how multiple servers can be described, for example, at the OpenAPI Object\'s [`servers`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasServers):\n\n\\\nJSON\n```json\n{\n  "servers": [\n    {\n      "url": "https://development.gigantic-server.com/v1",\n      "description": "Development server"\n    },\n    {\n      "url": "https://staging.gigantic-server.com/v1",\n      "description": "Staging server"\n    },\n    {\n      "url": "https://api.gigantic-server.com/v1",\n      "description": "Production server"\n    }\n  ]\n}\n```\n\n\n\\\nYAML\n```yaml\nservers:\n- url: https://development.gigantic-server.com/v1\n  description: Development server\n- url: https://staging.gigantic-server.com/v1\n  description: Staging server\n- url: https://api.gigantic-server.com/v1\n  description: Production server\n```\n\n\\\nThe following shows how variables can be used for a server configuration:\n\n\\\nJSON\n```json\n{\n  "servers": [\n    {\n      "url": "https://{username}.gigantic-server.com:{port}/{basePath}",\n      "description": "The production API server",\n      "variables": {\n        "username": {\n          "default": "demo",\n          "description": "this value is assigned by the service provider, in this example `gigantic-server.com`"\n        },\n        "port": {\n          "enum": [\n            "8443",\n            "443"\n          ],\n          "default": "8443"\n        },\n        "basePath": {\n          "default": "v2"\n        }\n      }\n    }\n  ]\n}\n```\n\n\n\\\nYAML\n```yaml\nservers:\n- url: https://{username}.gigantic-server.com:{port}/{basePath}\n  description: The production API server\n  variables:\n    username:\n      # note! no enum here means it is an open value\n      default: demo\n      description: this value is assigned by the service provider, in this example`gigantic-server.com`\n    port:\n      enum:\n        - \'8443\'\n        - \'443\'\n      default: \'8443\'\n    basePath:\n      # open meaning there is the opportunity to use special base paths as assigned by the provider, default is`v2`\n      default: v2\n```\n';

const docsParametersObject =
  '#### [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject)\n\nDescribes a single operation parameter.\n\nA unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn).\n\n##### Parameter Locations\n\nThere are four possible parameter locations specified by the `in` field:\n\n* path - Used together with [Path Templating](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathTemplating), where the parameter value is actually part of the operations URL. This does not include the host or base path of the API. For example, in `/items/{ itemId}`, the path parameter is `itemId`.\n* query - Parameters that are appended to the URL. For example, in `/items?id=###`, the query parameter is `id`.\n* header - Custom headers that are expected as part of the request. Note that [RFC7230](https://tools.ietf.org/html/rfc7230#page-22) states header names are case insensitive.\n* cookie - Used to pass a specific cookie value to the API.\n\n##### Fixed Fields  \n\nField Name | Type | Description\n---|:---:|---\nname | `string` | **REQUIRED**. The name of the parameter. Parameter names are *case sensitive*.\n&nbsp; | &nbsp; | * If [`in`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn) is `"path"`, the `name` field MUST correspond to a template expression occurring within the [path](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathsPath) field in the [Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathsObject). See [Path Templating](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathTemplating) for further information.\n&nbsp; | &nbsp; | * If [`in`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn) is `"header"` and the `name` field is `"Accept"`, `"Content-Type"` or `"Authorization"`, the parameter definition SHALL be ignored.\n&nbsp; | &nbsp; | * For all other cases, the `name` corresponds to the parameter name used by the [`in`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn) property.\nin | `string` | **REQUIRED**. The location of the parameter. Possible values are `"query"`, `"header"`, `"path"` or `"cookie"`. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\ndescription | `string` | A brief description of the parameter. This could contain examples of use. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nrequired | `boolean` | Determines whether this parameter is mandatory. If the [parameter location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn) is `"path"`, this property is **REQUIRED** and its value MUST be `true`. Otherwise, the property MAY be included and its default value is `false`.\ndeprecated | `boolean` | Specifies that a parameter is deprecated and SHOULD be transitioned out of usage. Default value is `false`.\nallowEmptyValue | `boolean` | Sets the ability to pass empty-valued parameters. This is valid only for `query` parameters and allows sending a parameter with an empty value. Default value is `false`. If [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterStyle) is used, and if behavior is `n/a` (cannot be serialized), the value of `allowEmptyValue` SHALL be ignored. Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.\n\n\\\nThe rules for serialization of the parameter are specified in one of two ways. For simpler scenarios, a schema and style can describe the structure and syntax of the parameter.\n\nField Name | Type | Description\n---|:---:|---\nstyle | `string` | Describes how the parameter value will be serialized depending on the type of the parameter value. Default values (based on value of `in`): for `query` - `form`; for `path` - `simple`; for `header` - `simple`; for `cookie` - `form`.\nexplode | `boolean` | When this is true, parameter values of type `array` or `object` generate separate parameters for each value of the array or key-value pair of the map. For other types of parameters this property has no effect. When [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterStyle) is `form`, the default value is `true`. For all other styles, the default value is `false`.\nallowReserved | `boolean` | Determines whether the parameter value SHOULD allow reserved characters, as defined by [RFC3986](https://tools.ietf.org/html/rfc3986#section-2.2) `:/?#[]@!$&\'()*+,;=` to be included without percent - encoding.This property only applies to parameters with an `in` value of `query`.The default value is `false`.\nschema | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) | The schema defining the type used for the parameter.\nexample | Any | Example of the parameter\'s potential value. The example SHOULD match the specified schema and encoding properties if present. The `example` field is mutually exclusive of the `examples` field. Furthermore, if referencing a `schema` that contains an example, the `example` value SHALL *override* the example provided by the schema. To represent examples of media types that cannot naturally be represented in JSON or YAML, a string value can contain the example with escaping where necessary.\nexamples | Map[`string`, [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#exampleObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)] | Examples of the parameter\'s potential value. Each example SHOULD contain a value in the correct format as specified in the parameter encoding. The `examples` field is mutually exclusive of the `example` field. Furthermore, if referencing a `schema` that contains an example, the `examples` value SHALL *override* the example provided by the schema.\n\n\\\nFor more complex scenarios, the [`content`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterContent) property can define the media type and schema of the parameter. A parameter MUST contain either a `schema` property, or a `content` property, but not both. When `example` or `examples` are provided in conjunction with the `schema` object, the example MUST follow the prescribed serialization strategy for the parameter.\n\nField Name | Type | Description\n---|:---:|---\ncontent | Map[`string`, [Media Type Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#mediaTypeObject)] | A map containing the representations for the parameter. The key is the media type and the value describes it. The map MUST only contain one entry.\n\n##### Style Values\n\nIn order to support common ways of serializing simple parameters, a set of `style` values are defined.\n\n`style` | [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#dataTypes) | `in` | Comments\n---|:---:|---:|---\nmatrix | `primitive`, `array`, `object` | `path` | Path-style parameters defined by [RFC6570](https://tools.ietf.org/html/rfc6570#section-3.2.7)\nlabel | `primitive`, `array`, `object` | `path` | Label style parameters defined by [RFC6570](https://tools.ietf.org/html/rfc6570#section-3.2.7)\nform | `primitive`, `array`, `object` | `query`, `cookie` | Form style parameters defined by [RFC6570](https://tools.ietf.org/html/rfc6570#section-3.2.8). This option replaces `collectionFormat` with a `csv` (when `explode` is false) or `multi` (when `explode` is true) value from OpenAPI 2.0.\nsimple | `array` | `path`, `header` | Simple style parameters defined by [RFC6570](https://tools.ietf.org/html/rfc6570#section-3.2.8). This option replaces `collectionFormat` with a `csv` value from OpenAPI 2.0.\nspaceDelimited | `array`, `object` | `query` | Space separated array or object values. This option replaces `collectionFormat` equal to `ssv` from OpenAPI 2.0.\npipeDelimited | `array`, `object` | `query` | Pipe separated array or object values. This option replaces `collectionFormat` equal to `pipes` from OpenAPI 2.0.\ndeepObject | `object` | `query` | Provides a simple way of rendering nested objects using form parameters.\n\n##### Style Examples\n\nAssume a parameter name `color` has one of the following values:\n\n`    string -> "blue`\n\n`    array -> ["blue","black","brown"]`\n\n`object -> { "R": 100, "G": 200, "B": 150 }`\n\n\\\nThe following table shows examples of rendering difference for each value:\n\n[`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#styleValues) | `explode` | `empty` | `string` | `array` | `object`\n---|:---:|---:|---:|---:|---:|\nmatrix | false | ;color | ;color=blue | ;color=blue,black,brown | ;color=R,100,G,200,B,150\n##### Examples\n\nExternal reference link to [Style Examples](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#style-examples)\n\nExternal reference link to [Parameter Object Examples](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameter-object-examples)\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n';

const documentation = [
  {
    // OAS 3.1 adds the last sentence vs OAS3.0.3, re: "rules for resolving"
    target: '$ref',
    docs: 'Allows for an external definition of this path item. The referenced structure MUST be in the format of a [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#pathItemObject). In case a Path Item Object field appears both in the defined object and the referenced object, the behavior is undefined. See the rules for resolving [Relative References](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#relativeReferencesURI).',
  },
  {
    target: 'summary',
    docs: 'An optional, string summary, intended to apply to all operations in this path.',
  },
  {
    target: 'description',
    docs: 'An optional, string description, intended to apply to all operations in this path. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
  },
  {
    target: 'get',
    docs: docsOperationObject,
  },
  {
    target: 'put',
    docs: docsOperationObject,
  },
  {
    target: 'post',
    docs: docsOperationObject,
  },
  {
    target: 'delete',
    docs: docsOperationObject,
  },
  {
    target: 'options',
    docs: docsOperationObject,
  },
  {
    target: 'head',
    docs: docsOperationObject,
  },
  {
    target: 'patch',
    docs: docsOperationObject,
  },
  {
    target: 'trace',
    docs: docsOperationObject,
  },
  {
    target: 'servers',
    docs: docsServersObject,
  },
  {
    target: 'parameters',
    docs: docsParametersObject,
  },
  {
    docs: docsPathItemObject,
  },
];

export default documentation;
