/**
 * Before using transform function please use
 * this tool https://markdown-it.github.io/ to verify how your Markdown renders.
 */

const transform = (str) => {
  const jsonTransformed = str.replace(/```json/m, '\n\\\nJSON\n```json');
  const yamlTransformed = jsonTransformed.replace(/```yaml/m, '\n\\\nYAML\n```yaml');
  const transformed = JSON.stringify(yamlTransformed.trim().replace(/(\r\n|\n|\r)/gm, '\n'));
  console.log(transformed);
};

transform(`#### [Parameters Definitions Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md)

An object to hold parameters to be reused across operations. Parameter definitions can be referenced to the ones defined here.

This does *not* define global operation parameters.

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
{name} | [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterObject) | A single parameter definition, mapping a "name" to the parameter it defines.

##### Parameters Definition Object Example

\`\`\`js
{
  "skipParam": {
    "name": "skip",
    "in": "query",
    "description": "number of items to skip",
    "required": true,
    "type": "integer",
    "format": "int32"
  },
  "limitParam": {
    "name": "limit",
    "in": "query",
    "description": "max records to return",
    "required": true,
    "type": "integer",
    "format": "int32"
  }
}
\`\`\`

\`\`\`yaml
skipParam:
  name: skip
  in: query
  description: number of items to skip
  required: true
  type: integer
  format: int32
limitParam:
  name: limit
  in: query
  description: max records to return
  required: true
  type: integer
  format: int32
\`\`\``);
