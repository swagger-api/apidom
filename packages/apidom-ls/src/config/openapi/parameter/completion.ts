import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';
import { OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

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
    targetSpecs: OpenAPI3,
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
        'Sets the ability to pass empty-valued parameters. This is valid only for `query` parameters and allows sending a parameter with an empty value. Default value is `false`. If [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterStyle) is used, and if behavior is `n/a` (cannot be serialized), the value of `allowEmptyValue` SHALL be ignored. Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.',
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
        'Sets the ability to pass empty-valued parameters. This is valid only for `query` parameters and allows sending a parameter with an empty value. Default value is `false`. If [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterStyle) is used, and if behavior is `n/a` (cannot be serialized), the value of `allowEmptyValue` SHALL be ignored. Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.',
    },
    targetSpecs: OpenAPI31,
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
    targetSpecs: OpenAPI3,
  },
  {
    target: 'in',
    label: 'header',
    insertText: 'header',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI3,
  },
  {
    target: 'in',
    label: 'path',
    insertText: 'path',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: OpenAPI3,
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
