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
    // todo: add the table from operation object. recommend build it out first, then copy/paste here
    docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a GET operation on this path.',
  },
  {
    target: 'put',
    docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a PUT operation on this path.',
  },
  {
    target: 'post',
    docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a POST operation on this path.',
  },
  {
    target: 'delete',
    docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a DELETE operation on this path.',
  },
  {
    target: 'options',
    docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a OPTIONS operation on this path.',
  },
  {
    target: 'head',
    docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a HEAD operation on this path.',
  },
  {
    target: 'patch',
    docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a PATCH operation on this path.',
  },
  {
    target: 'trace',
    docs: '#### [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject)\n\nA definition of a TRACE operation on this path.',
  },
  {
    target: 'servers',
    // todo: add the table from server object. recommend build it out first, then copy/paste here
    docs: '#### [Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)\n\nAn alternative `server` array to service all operations in this path.',
  },
  {
    target: 'parameters',
    // todo: add the table from parameter object. recommend build it out first, then copy/paste here
    docs: '#### [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) | [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)\n\nA list of parameters that are applicable for all the operations described under this path. These parameters can be overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn). The list can use the [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject) to link to parameters that are defined at the [OpenAPI Objects components/parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsParameters).',
  },
  {
    // todo: add the full list of "Fixed Fields" table
    docs: '#### [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemObject)\n\nDescribes the operations available on a single path. A Path Item MAY be empty, due to [ACL constraints](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#securityFiltering). The path itself is still exposed to the documentation viewer but they will not know which operations and parameters are available',
  },
];

export default documentation;
