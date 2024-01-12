import { OpenAPI2 } from '../target-specs';

const documentation = [
  {
    docs: '#### [Scopes Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#scopes-object)\n\nLists the available scopes for an OAuth2 security scheme.\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n{name} | `string` | Maps between a name of a scope to a short description of it (as the value of the property).\n\n##### Patterned Objects\n\nField Pattern | Type | Description\n---|:---:|---\n^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#vendorExtensions) for further details.\n\n##### Scopes Object Example\n\n```js\n{\n  "write:pets": "modify pets in your account",\n  "read:pets": "read your pets"\n}\n```\n\n\n\\\nYAML\n```yaml\nwrite:pets: modify pets in your account\nread:pets: read your pets\n```',
    targetSpecs: OpenAPI2,
  },
];

export default documentation;
