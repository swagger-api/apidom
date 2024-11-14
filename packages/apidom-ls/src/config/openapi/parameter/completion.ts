import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: '$ref',
    insertText: '\\$ref',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A reference to a Parameter.',
    },
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'name',
    insertText: 'name',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**Required.** The name of the parameter. Parameter names are *case sensitive*.\n\n* If [`in`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterIn) is `"path"`, the `name` field MUST correspond to the associated path segment from the [path](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathsPath) field in the [Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathsObject). See [Path Templating](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathTemplating) for further information.\n* For all other cases, the `name` corresponds to the parameter name used based on the [`in`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterIn) property.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'name',
    insertText: 'name',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**REQUIRED**. The name of the parameter. Parameter names are *case sensitive*.\n\n  * If [`in`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterIn) is `"path"`, the `name` field MUST correspond to a template expression occurring within the [path](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#pathsPath) field in the [Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#pathsObject). See [Path Templating](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#pathTemplating) for further information.\n\n  * If [`in`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterIn) is `"header"` and the `name` field is `"Accept"`, `"Content-Type"` or `"Authorization"`, the parameter definition SHALL be ignored.\n\n  * For all other cases, the `name` corresponds to the parameter name used by the [`in`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterIn) property.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'name',
    insertText: 'name',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**REQUIRED**. The name of the parameter. Parameter names are *case sensitive*.\n\n  * If [`in`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn) is `"path"`, the `name` field MUST correspond to a template expression occurring within the [path](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathsPath) field in the [Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathsObject). See [Path Templating](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathTemplating) for further information.\n\n  * If [`in`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn) is `"header"` and the `name` field is `"Accept"`, `"Content-Type"` or `"Authorization"`, the parameter definition SHALL be ignored.\n\n  * For all other cases, the `name` corresponds to the parameter name used by the [`in`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn) property.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'in',
    insertText: 'in',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**Required.** The location of the parameter. Possible values are "query", "header", "path", "formData" or "body".',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'in',
    insertText: 'in',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**REQUIRED**. The location of the parameter. Possible values are `"query"`, `"header"`, `"path"` or `"cookie"`.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'description',
    insertText: 'description',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'A brief description of the parameter. This could contain examples of use.  [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'description',
    insertText: 'description',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'A brief description of the parameter. This could contain examples of use. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'required',
    insertText: 'required',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Determines whether this parameter is mandatory. If the parameter is [`in`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterIn) "path", this property is **required** and its value MUST be `true`. Otherwise, the property MAY be included and its default value is `false`.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'required',
    insertText: 'required',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Determines whether this parameter is mandatory. If the [parameter location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterIn) is `"path"`, this property is **REQUIRED** and its value MUST be `true`. Otherwise, the property MAY be included and its default value is `false`.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'required',
    insertText: 'required',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Determines whether this parameter is mandatory. If the [parameter location](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterIn) is `"path"`, this property is **REQUIRED** and its value MUST be `true`. Otherwise, the property MAY be included and its default value is `false`.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'deprecated',
    insertText: 'deprecated',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Specifies that a parameter is deprecated and SHOULD be transitioned out of usage. Default value is `false`.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'allowEmptyValue',
    insertText: 'allowEmptyValue',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\n\\\nSets the ability to pass empty-valued parameters. This is valid only for either `query` or `formData` parameters and allows you to send a parameter with a name only or  an empty value. Default value is `false`.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'allowEmptyValue',
    insertText: 'allowEmptyValue',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\n\\\nSets the ability to pass empty-valued parameters. This is valid only for `query` parameters and allows sending a parameter with an empty value. Default value is `false`. If [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterStyle) is used, and if behavior is `n/a` (cannot be serialized), the value of `allowEmptyValue` SHALL be ignored. Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'allowEmptyValue',
    insertText: 'allowEmptyValue',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\n\\\nSets the ability to pass empty-valued parameters. This is valid only for `query` parameters and allows sending a parameter with an empty value. Default value is `false`. If [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterStyle) is used, and if behavior is `n/a` (cannot be serialized), the value of `allowEmptyValue` SHALL be ignored. Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'items',
    insertText: 'items',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Items Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#itemsObject)\n\\\n\\\n**Required if [`type`](#parameterType) is "array".** Describes the type of items in the array.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'collectionFormat',
    insertText: 'collectionFormat',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Determines the format of the array if type array is used. Possible values are:\n\n* `csv` - comma separated values `foo,bar`.\n* `ssv` - space separated values `foo bar`.\n* `tsv` - tab separated values `foo\\tbar`.\n* `pipes` - pipe separated values `foo&#124;bar`.\n*`multi` - corresponds to multiple parameter instances instead of multiple values for a single instance `foo=bar&foo=baz`. This is valid only for parameters [`in`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterIn) "query" or "formData".\n\nDefault value is `csv`.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'default',
    insertText: 'default',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`Any`\n\\\n\\\nDeclares the value of the parameter that the server will use if none is provided, for example a "count" to control the number of results per page might default to 100 if not supplied by the client in the request. (Note: "default" has no meaning for required parameters.)  See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2. Unlike JSON Schema this value MUST conform to the defined [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterType) for this parameter.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'maximum',
    insertText: 'maximum',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`number`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'exclusiveMaximum',
    insertText: 'exclusiveMaximum',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'minimum',
    insertText: 'minimum',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`number`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'exclusiveMinimum',
    insertText: 'exclusiveMinimum',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'maxLength',
    insertText: 'maxLength',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.1.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'minLength',
    insertText: 'minLength',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.2.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'pattern',
    insertText: 'pattern',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.3.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'maxItems',
    insertText: 'maxItems',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.2.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'minItems',
    insertText: 'minItems',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.3.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'uniqueItems',
    insertText: 'uniqueItems',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.4.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'enum',
    insertText: 'enum',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`[*]`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'multipleOf',
    insertText: 'multipleOf',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`number`\n\\\n\\\nSee https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.1.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'style',
    insertText: 'style',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Describes how the parameter value will be serialized depending on the type of the parameter value. Default values (based on value of `in`): for `query` - `form`; for `path` - `simple`; for `header` - `simple`; for `cookie` - `form`.',
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'explode',
    insertText: 'explode',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'When this is true, parameter values of type `array` or `object` generate separate parameters for each value of the array or key-value pair of the map. For other types of parameters this property has no effect. When [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterStyle) is `form`, the default value is `true`. For all other styles, the default value is `false`.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'explode',
    insertText: 'explode',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'When this is true, parameter values of type `array` or `object` generate separate parameters for each value of the array or key-value pair of the map. For other types of parameters this property has no effect. When [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterStyle) is `form`, the default value is `true`. For all other styles, the default value is `false`.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'allowReserved',
    insertText: 'allowReserved',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "Determines whether the parameter value SHOULD allow reserved characters, as defined by [RFC3986](https://tools.ietf.org/html/rfc3986#section-2.2) `:/?#[]@!$&'()*+,;=` to be included without percent - encoding. This property only applies to parameters with an `in` value of `query`. The default value is `false`.",
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'schema',
    insertText: 'schema',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#schemaObject)\n\\\n\\\n**Required.** The schema defining the type used for the body parameter.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'schema',
    insertText: 'schema',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject)\n\\\n\\\nThe schema defining the type used for the parameter.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'schema',
    insertText: 'schema',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)\n\\\n\\\nThe schema defining the type used for the parameter.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'type',
    insertText: 'type',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '**Required.** The type of the parameter. Since the parameter is not located at the request body, it is limited to simple types (that is, not an object). The value MUST be one of `"string"`, `"number"`, `"integer"`, `"boolean"`, `"array"` or `"file"`. If `type` is `"file"`, the [`consumes`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#operationConsumes) MUST be either `"multipart/form-data"`, `" application/x-www-form-urlencoded"` or both and the parameter MUST be [`in`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterIn) `"formData"`.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'format',
    insertText: 'format',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The extending format for the previously mentioned [`type`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterType). See [Data Type Formats](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#dataTypeFormat) for further details.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'example',
    insertText: 'example',
    kind: 14,
    format: CompletionFormat.UNDEFINED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "Example of the parameter's potential value. The example SHOULD match the specified schema and encoding properties if present. The `example` field is mutually exclusive of the `examples` field. Furthermore, if referencing a `schema` that contains an example, the `example` value SHALL *override* the example provided by the schema. To represent examples of media types that cannot naturally be represented in JSON or YAML, a string value can contain the example with escaping where necessary.",
    },
    targetSpecs: OpenAPI3,
  },
  {
    label: 'examples',
    insertText: 'examples',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "Map[`string`, [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#exampleObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject)]\n\\\n\\\nExamples of the parameter's potential value. Each example SHOULD contain a value in the correct format as specified in the parameter encoding. The `examples` field is mutually exclusive of the `example` field. Furthermore, if referencing a `schema` that contains an example, the `examples` value SHALL *override* the example provided by the schema",
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'examples',
    insertText: 'examples',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "Map[`string`, [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#exampleObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nExamples of the parameter's potential value. Each example SHOULD contain a value in the correct format as specified in the parameter encoding. The `examples` field is mutually exclusive of the `example` field. Furthermore, if referencing a `schema` that contains an example, the `examples` value SHALL *override* the example provided by the schema",
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'content',
    insertText: 'content',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Media Type Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#mediaTypeObject)]\n\\\n\\\nA map containing the representations for the parameter. The key is the media type and the value describes it. The map MUST only contain one entry.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'content',
    insertText: 'content',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Media Type Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#mediaTypeObject)]\n\\\n\\\nA map containing the representations for the parameter. The key is the media type and the value describes it. The map MUST only contain one entry.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    target: 'in',
    label: 'query',
    insertText: 'query',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'in',
    label: 'header',
    insertText: 'header',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'in',
    label: 'path',
    insertText: 'path',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'in',
    label: 'formData',
    insertText: 'formData',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'in',
    label: 'body',
    insertText: 'body',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'in',
    label: 'cookie',
    insertText: 'cookie',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI3,
  },
  {
    target: 'type',
    label: 'string',
    insertText: 'string',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'type',
    label: 'number',
    insertText: 'number',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'type',
    label: 'integer',
    insertText: 'integer',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'type',
    label: 'boolean',
    insertText: 'boolean',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'type',
    label: 'array',
    insertText: 'array',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'type',
    label: 'file',
    insertText: 'file',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'int32',
    insertText: 'int32',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'int64',
    insertText: 'int64',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'float',
    insertText: 'float',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'double',
    insertText: 'double',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'byte',
    insertText: 'byte',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'binary',
    insertText: 'binary',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'date',
    insertText: 'date',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'date-time',
    insertText: 'date-time',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'format',
    label: 'password',
    insertText: 'password',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'collectionFormat',
    label: 'csv',
    insertText: 'csv',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'collectionFormat',
    label: 'ssv',
    insertText: 'ssv',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'collectionFormat',
    label: 'tsv',
    insertText: 'tsv',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'collectionFormat',
    label: 'pipes',
    insertText: 'pipes',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'collectionFormat',
    label: 'multi',
    insertText: 'multi',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI2,
  },
  {
    target: 'style',
    label: 'form',
    insertText: 'form',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI3,
  },
  {
    target: 'style',
    label: 'simple',
    insertText: 'simple',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI3,
  },
];

export default completion;
