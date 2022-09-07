const docsServerObject =
  '#### [Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)\n\nAn object representing a Server.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nurl | [`string`] | **REQUIRED**. A URL to the target host. This URL supports Server Variables and MAY be relative, to indicate that the host location is relative to the location where the OpenAPI document is being served. Variable substitutions will be made when a variable is named in {brackets}.\ndescription | `string` | An optional string describing the host designated by the URL. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nvariables | Map[`string`, [Server Variable Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableObject)] | A map between a variable name and its value. The value is used for substitution in the server URL template.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Server Object Example\n\n\n\\\nA single server would be described as:\n\n\\\nJSON\n```json\n{\n  "url": "https://development.gigantic-server.com/v1",\n  "description": "Development server"\n}\n```\n\n\n\\\nYAML\n```yaml\nurl: https://development.gigantic-server.com/v1\ndescription: Development server\n```\n\n\\\nThe following shows how multiple servers can be described, for example, at the OpenAPI Object\'s [`servers`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasServers):\n\n\\\nJSON\n```json\n{\n  "servers": [\n    {\n      "url": "https://development.gigantic-server.com/v1",\n      "description": "Development server"\n    },\n    {\n      "url": "https://staging.gigantic-server.com/v1",\n      "description": "Staging server"\n    },\n    {\n      "url": "https://api.gigantic-server.com/v1",\n      "description": "Production server"\n    }\n  ]\n}\n```\n\n\n\\\nYAML\n```yaml\nservers:\n- url: https://development.gigantic-server.com/v1\n  description: Development server\n- url: https://staging.gigantic-server.com/v1\n  description: Staging server\n- url: https://api.gigantic-server.com/v1\n  description: Production server\n```\n\n\\\nThe following shows how variables can be used for a server configuration:\n\n\\\nJSON\n```json\n{\n  "servers": [\n    {\n      "url": "https://{username}.gigantic-server.com:{port}/{basePath}",\n      "description": "The production API server",\n      "variables": {\n        "username": {\n          "default": "demo",\n          "description": "this value is assigned by the service provider, in this example `gigantic-server.com`"\n        },\n        "port": {\n          "enum": [\n            "8443",\n            "443"\n          ],\n          "default": "8443"\n        },\n        "basePath": {\n          "default": "v2"\n        }\n      }\n    }\n  ]\n}\n```\n\n\n\\\nYAML\n```yaml\nservers:\n- url: https://{username}.gigantic-server.com:{port}/{basePath}\n  description: The production API server\n  variables:\n    username:\n      # note! no enum here means it is an open value\n      default: demo\n      description: this value is assigned by the service provider, in this example`gigantic-server.com`\n    port:\n      enum:\n        - \'8443\'\n        - \'443\'\n      default: \'8443\'\n    basePath:\n      # open meaning there is the opportunity to use special base paths as assigned by the provider, default is`v2`\n      default: v2\n```\n';

const documentation = [
  {
    target: 'url',
    docs: '**REQUIRED.** A URL to the target host. This URL supports Server Variables and MAY be relative, to indicate that the host location is relative to the location where the OpenAPI document is being served. Variable substitutions will be made when a variable is named in `{` brackets `}`.',
  },
  {
    target: 'description',
    docs: 'An optional string describing the host designated by the URL. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
  },
  {
    target: 'variables',
    docs: "#### Map[`string`, [Server Variable Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableObject)]\n\nA map between a variable name and its value. The value is used for substitution in the server's URL template.",
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    docs: docsServerObject,
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
