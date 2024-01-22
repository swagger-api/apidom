import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';
import { AsyncAPI2 } from '../../asyncapi/target-specs';
import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI3 } from '../../openapi/target-specs';

const completion: ApidomCompletionItem[] = [
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
        'The value of this keyword **MUST** be either a string or an array. If it is an array, elements of the array **MUST** be strings and **MUST** be unique.\n\n  ----  \n\nString values **MUST** be one of the six primitive types ("null", "boolean", "object", "array", "number", or "string"), or "integer" which matches any number with a zero fractional part.\n\n  ----  \n\nAn instance validates if and only if the instance is in any of the sets listed for this keyword.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
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
        "The value of this keyword **MUST** be an array. This array **SHOULD** have at least one element. Elements in the array **SHOULD** be unique.\n\n  ----  \n\nAn instance validates successfully against this keyword if its value is equal to one of the elements in this keyword's array value.\n\n  ----  \n\nElements in the array might be of any value, including null.\n\n  ----  \n\n",
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'const',
    insertText: 'const',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The value of this keyword **MAY** be of any type, including null.\n\n  ----  \n\nAn instance validates successfully against this keyword if its value is equal to the value of the keyword.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
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
        'The value of "multipleOf" **MUST** be a number, strictly greater than 0.\n\n  ----  \n\nA numeric instance is valid only if division by this keyword\'s value results in an integer.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
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
        'The value of "maximum" **MUST** be a number, representing an inclusive upper limit for a numeric instance.\n\n  ----  \n\nIf the instance is a number, then this keyword validates only if the instance is less than or exactly equal to "maximum".\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
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
        'The value of "exclusiveMaximum" **MUST** be number, representing an exclusive upper limit for a numeric instance.\n\n  ----  \n\nIf the instance is a number, then the instance is valid only if it has a value strictly less than (not equal to) "exclusiveMaximum".\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
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
        'The value of "minimum" **MUST** be a number, representing an inclusive lower limit for a numeric instance.\n\n  ----  \n\nIf the instance is a number, then this keyword validates only if the instance is greater than or exactly equal to "minimum".\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
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
        'The value of "exclusiveMinimum" **MUST** be number, representing an exclusive lower limit for a numeric instance.\n\n  ----  \n\nIf the instance is a number, then the instance is valid only if it has a value strictly greater than (not equal to) "exclusiveMinimum".\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
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
        'The value of this keyword **MUST** be a non-negative integer.\n\n  ----  \n\nA string instance is valid against this keyword if its length is less than, or equal to, the value of this keyword.\n\n  ----  \n\nThe length of a string instance is defined as the number of its characters as defined by <xref target="RFC7159">RFC 7159</xref>.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
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
        'The value of this keyword **MUST** be a non-negative integer.\n\n  ----  \n\nA string instance is valid against this keyword if its length is greater than, or equal to, the value of this keyword.\n\n  ----  \n\nThe length of a string instance is defined as the number of its characters as defined by <xref target="RFC7159">RFC 7159</xref>.\n\n  ----  \n\nOmitting this keyword has the same behavior as a value of 0.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
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
      value:
        'The value of this keyword **MUST** be a string. This string **SHOULD** be a valid regular expression, according to the ECMA 262 regular expression dialect.\n\n  ----  \n\nA string instance is considered valid if the regular expression matches the instance successfully. Recall: regular expressions are not implicitly anchored.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
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
        'The value of "items" **MUST** be either a valid JSON Schema or an array of valid JSON Schemas.\n\n  ----  \n\nThis keyword determines how child instances validate for arrays, and does not directly validate the immediate instance itself.\n\n  ----  \n\nIf "items" is a schema, validation succeeds if all elements in the array successfully validate against that schema.\n\n  ----  \n\nIf "items" is an array of schemas, validation succeeds if each element of the instance validates against the schema at the same position, if any.\n\n  ----  \n\nOmitting this keyword has the same behavior as an empty schema.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'additionalItems',
    insertText: 'additionalItems',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The value of "additionalItems" **MUST** be a valid JSON Schema.\n\n  ----  \n\nThis keyword determines how child instances validate for arrays, and does not directly validate the immediate instance itself.\n\n  ----  \n\nIf "items" is an array of schemas, validation succeeds if every instance element at a position greater than the size of "items" validates against "additionalItems".\n\n  ----  \n\nOtherwise, "additionalItems" **MUST** be ignored, as the "items" schema (possibly the default value of an empty schema) is applied to all elements.\n\n  ----  \n\nOmitting this keyword has the same behavior as an empty schema.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
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
        'The value of this keyword **MUST** be a non-negative integer.\n\n  ----  \n\nAn array instance is valid against "maxItems" if its size is less than, or equal to, the value of this keyword.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
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
        'The value of this keyword **MUST** be a non-negative integer.\n\n  ----  \n\nAn array instance is valid against "minItems" if its size is greater than, or equal to, the value of this keyword.\n\n  ----  \n\nOmitting this keyword has the same behavior as a value of 0.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
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
        'The value of this keyword **MUST** be a boolean.\n\n  ----  \n\nIf this keyword has boolean value false, the instance validates successfully. If it has boolean value true, the instance validates successfully if all of its elements are unique.\n\n  ----  \n\nOmitting this keyword has the same behavior as a value of false.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'contains',
    insertText: 'contains',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The value of this keyword **MUST** be a valid JSON Schema.\n\n  ----  \n\nAn array instance is valid against "contains" if at least one of its elements is valid against the given schema.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    label: 'maxProperties',
    insertText: 'maxProperties',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The value of this keyword **MUST** be a non-negative integer.\n\n  ----  \n\nAn object instance is valid against "maxProperties" if its number of properties is less than, or equal to, the value of this keyword.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'minProperties',
    insertText: 'minProperties',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The value of this keyword **MUST** be a non-negative integer.\n\n  ----  \n\nAn object instance is valid against "minProperties" if its number of properties is greater than, or equal to, the value of this keyword.\n\n  ----  \n\nOmitting this keyword has the same behavior as a value of 0.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    label: '$ref',
    insertText: '\\$ref',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The "$ref" keyword is used to reference a schema, and provides the ability to validate recursive structures through self-reference. \n\n  ----  \n\nAn object schema with a "$ref" property MUST be interpreted as a "$ref" reference. The value of the "$ref" property **MUST** be a URI Reference. \n\n  ----  \n\nResolved against the current URI base, it identifies the URI of a schema to use. All other properties in a "$ref" object **MUST** be ignored. \n\n  ----  \n\nThe URI is not a network locator, only an identifier. A schema need not be downloadable from the address if it is a network-addressable URL, and implementations **SHOULD NOT** assume they should perform a network operation when they encounter a network-addressable URI. \n\n  ----  \n\nA schema **MUST NOT** be run into an infinite loop against a schema. For example, if two schemas "#alice" and "#bob" both have an "allOf" property that refers to the other, a naive validator might get stuck in an infinite recursive loop trying to validate the instance. Schemas **SHOULD NOT** make use of infinite recursive nesting like this; the behavior is undefined.`.\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'required',
    insertText: 'required',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The value of this keyword **MUST** be an array. Elements of this array, if any, **MUST** be strings, and **MUST** be unique.\n\n  ----  \n\nAn object instance is valid against this keyword if every item in the array is the name of a property in the instance.\n\n  ----  \n\nOmitting this keyword has the same behavior as an empty array.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },

  {
    label: 'properties',
    insertText: 'properties',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The value of "properties" **MUST** be an object. Each value of this object **MUST** be a valid JSON Schema.\n\n  ----  \n\nThis keyword determines how child instances validate for objects, and does not directly validate the immediate instance itself.\n\n  ----  \n\nValidation succeeds if, for each name that appears in both the instance and as a name within this keyword\'s value, the child instance for that name successfully validates against the corresponding schema.\n\n  ----  \n\nOmitting this keyword has the same behavior as an empty object.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'patternProperties',
    insertText: 'patternProperties',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The value of "patternProperties" **MUST** be an object. Each property name of this object **SHOULD** be a valid regular expression, according to the ECMA 262 regular expression dialect. Each property value of this object **MUST** be a valid JSON Schema.\n\n  ----  \n\nThis keyword determines how child instances validate for objects, and does not directly validate the immediate instance itself. Validation of the primitive instance type against this keyword always succeeds.\n\n  ----  \n\nValidation succeeds if, for each instance name that matches any regular expressions that appear as a property name in this keyword\'s value, the child instance for that name successfully validates against each schema that corresponds to a matching regular expression.\n\n  ----  \n\nOmitting this keyword has the same behavior as an empty object.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    label: 'additionalProperties',
    insertText: 'additionalProperties',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The value of "additionalProperties" **MUST** be a valid JSON Schema.\n\n  ----  \n\nThis keyword determines how child instances validate for objects, and does not directly validate the immediate instance itself.\n\n  ----  \n\nValidation with "additionalProperties" applies only to the child values of instance names that do not match any names in "properties", and do not match any regular expression in "patternProperties".\n\n  ----  \n\nFor all such properties, validation succeeds if the child instance validates against the "additionalProperties" schema.\n\n  ----  \n\nOmitting this keyword has the same behavior as an empty schema.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'propertyNames',
    insertText: 'propertyNames',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The value of "propertyNames" **MUST** be a valid JSON Schema.\n\n  ----  \n\nIf the instance is an object, this keyword validates if every property name in the instance validates against the provided schema. Note the property name that the schema is testing will always be a string.\n\n  ----  \n\nOmitting this keyword has the same behavior as an empty schema.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    label: 'if',
    insertText: 'if',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'This keyword\'s value **MUST** be a valid JSON Schema.\n\n  ----  \n\n   This validation outcome of this keyword\'s subschema has no direct   effect on the overall validation result.  Rather, it controls which   of the "then" or "else" keywords are evaluated.\n\n  ----  \n\n   Instances that successfully validate against this keyword\'s subschema   **MUST** also be valid against the subschema value of the "then" keyword,   if present.\n\n  ----  \n\n   Instances that fail to validate against this keyword\'s subschema **MUST**   also be valid against the subschema value of the "else" keyword, if   present.\n\n  ----  \n\n   If annotations (Section 3.3) are being collected, they are collected   from this keyword\'s subschema in the usual way, including when the   keyword is present without either "then" or "else".',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    label: 'then',
    insertText: 'then',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'This keyword\'s value **MUST** be a valid JSON Schema.\n\n  ----  \n\nWhen "if" is present, and the instance successfully validates against its subschema, then validation succeeds against this keyword if the instance also successfully validates against this keyword\'s subschema.\n\n  ----  \n\nThis keyword has no effect when "if" is absent, or when the instance fails to validate against its subschema.  Implementations **MUST** NOT evaluate the instance against this keyword, for either validation or annotation collection purposes, in such cases.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    label: 'else',
    insertText: 'else',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'This keyword\'s value **MUST** be a valid JSON Schema.\n\n  ----  \n\nWhen "if" is present, and the instance fails to validate against its subschema, then validation succeeds against this keyword if the instance successfully validates against this keyword\'s subschema.\n\n  ----  \n\nThis keyword has no effect when "if" is absent, or when the instance successfully validates against its subschema.  Implementations **MUST** NOT evaluate the instance against this keyword, for either validation or annotation collection purposes, in such cases.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    label: 'allOf',
    insertText: 'allOf',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "This keyword's value **MUST** be a non-empty array. Each item of the array **MUST** be a valid JSON Schema.\n\n  ----  \n\nAn instance validates successfully against this keyword if it validates successfully against all schemas defined by this keyword's value.\n\n  ----  \n\n",
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'anyOf',
    insertText: 'anyOf',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "This keyword's value **MUST** be a non-empty array. Each item of the array **MUST** be a valid JSON Schema.\n\n  ----  \n\nAn instance validates successfully against this keyword if it validates successfully against at least one schema defined by this keyword's value.\n\n  ----  \n\n",
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    label: 'oneOf',
    insertText: 'oneOf',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "This keyword's value **MUST** be a non-empty array. Each item of the array **MUST** be a valid JSON Schema.\n\n  ----  \n\nAn instance validates successfully against this keyword if it validates successfully against exactly one schema defined by this keyword's value.\n\n  ----  \n\n",
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    label: 'not',
    insertText: 'not',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "This keyword's value **MUST** be a valid JSON Schema.\n\n  ----  \n\nAn instance is valid against this keyword if it fails to validate successfully against the schema defined by this keyword.\n\n  ----  \n\n",
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    label: 'contentEncoding',
    insertText: 'contentEncoding',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'If the instance value is a string, this property defines that the string **SHOULD** be interpreted as binary data and decoded using the encoding named by this property. <xref target="RFC2045">RFC 2045, Sec 6.1</xref> lists the possible values for this property.\n\n  ----  \n\nThe value of this property **MUST** be a string.\n\n  ----  \n\nThe value of this property **SHOULD** be ignored if the instance described is not a string.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    label: 'contentMediaType',
    insertText: 'contentMediaType',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The value of this property must be a media type, as defined by <xref target="RFC2046">RFC 2046</xref>. This property defines the media type of instances which this schema defines.\n\n  ----  \n\nThe value of this property **MUST** be a string.\n\n  ----  \n\nThe value of this property **SHOULD** be ignored if the instance described is not a string.\n\n  ----  \n\nIf the "contentEncoding" property is not present, but the instance value is a string, then the value of this property **SHOULD** specify a text document type, and the character set **SHOULD** be the character set into which the JSON string value was decoded (for which the default is Unicode).\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    label: 'example',
    insertText: 'example',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A free-form property to include an example of an instance for this schema.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'example',
    insertText: 'example',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'A free-form property to include an example of an instance for this schema. To represent examples that cannot be naturally represented in JSON or YAML, a string value can be used to contain the example with escaping where necessary.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'example',
    insertText: 'example',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'A free-form property to include an example of an instance for this schema. To represent examples that cannot be naturally represented in JSON or YAML, a string value can be used to contain the example with escaping where necessary.\n\n**Deprecated:** The `example` property has been deprecated in favor of the JSON Schema `examples` keyword. Use of `example` is discouraged, and later versions of this specification may remove it.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'examples',
    insertText: 'examples',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The value of this keyword **MUST** be an array. There are no restrictions placed on the values within the array. When multiple occurrences of this keyword are applicable to a single sub-instance, implementations **MUST** provide a flat array of all values rather than an array of arrays.\n\n  ----  \n\nThis keyword can be used to provide sample JSON values associated with a particular schema, for the purpose of illustrating usage.  It is RECOMMENDED that these values be valid against the associated schema.\n\n  ----  \n\nImplementations **MAY** use the value(s) of "default", if present, as an additional example.  If "examples" is absent, "default" **MAY** still be used in this manner.\n\n  ----  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
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
        'Structural validation alone may be insufficient to validate that an instance meets all the requirements of an application. The "format" keyword is defined to allow interoperable semantic validation for a fixed subset of values which are accurately described by authoritative resources, be they RFCs or other external specifications.\n\n  ----  \n\nThe value of this keyword is called a format attribute. It **MUST** be a  string. A format attribute can generally only validate a given set  of instance types. If the type of the instance to validate is not in  this set, validation for this format attribute and instance **SHOULD**  succeed.\n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'title',
    insertText: 'title',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The value of "title" and "description" MUST be a string.\n\n  ----  \n\nBoth of these keywords can be used to decorate a user interface with information about the data produced by this user interface. A title will preferably be short, whereas a description will provide explanation about the purpose of the instance described by this schema.\n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
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
        'The value of "title" and "description" MUST be a string.\n\n  ----  \n\nBoth of these keywords can be used to decorate a user interface with information about the data produced by this user interface. A title will preferably be short, whereas a description will provide explanation about the purpose of the instance described by this schema.\n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
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
        'Unlike JSON Schema, the value MUST conform to the defined type for the Schema Object.',
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
        'The default value represents what would be assumed by the consumer of the input as the value of the schema if one is not provided. Unlike JSON Schema, the value MUST conform to the defined type for the Schema Object defined at the same level. For example, if `type` is `string`, then `default` can be `"foo"` but cannot be `1`.',
    },
    targetSpecs: OpenAPI30,
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
        'There are no restrictions placed on the value of this keyword.  When multiple occurrences of this keyword are applicable to a single sub-instance, implementations **SHOULD** remove duplicates.\n\nThis keyword can be used to supply a default JSON value associated with a particular schema.  It is **RECOMMENDED** that a default value be valid against the associated schema.',
    },
    targetSpecs: OpenAPI31,
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
        'The default value represents what would be assumed by the consumer of the input as the value of the schema if one is not provided. Unlike JSON Schema, the value MUST conform to the defined type for the Schema Object defined at the same level. For example, of `type` is `string`, then `default` can be `"foo"` but cannot be `1`.',
    },
    targetSpecs: AsyncAPI2,
  },
  {
    label: 'readOnly',
    insertText: 'readOnly',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The value of these keywords **MUST** be a boolean.  When multiple occurrences of these keywords are applicable to a single sub-instance, the resulting value **MUST** be true if any occurrence specifies a true value, and **MUST** be false otherwise.\n\n  ----  \n\nIf "readOnly" has a value of boolean true, it indicates that the value of the instance is managed exclusively by the owning authority, and attempts by an application to modify the value of this property are expected to be ignored or rejected by that owning authority.\n\n  ----  \n\nAn instance document that is marked as "readOnly for the entire document **MAY** be ignored if sent to the owning authority, or **MAY** result in an error, at the authority \'s discretion.\n\n  ----  \n\nIf "writeOnly" has a value of boolean true, it indicates that the value is never present when the instance is retrieved from the owning authority.  It can be present when sent to the owning authority to update or create the document (or the resource it represents), but it will not be included in any updated or newly created version of the instance.\n\n  ----  \n\nAn instance document that is marked as "writeOnly" for the entire document **MAY** be returned as a blank document of some sort, or **MAY** produce an error upon retrieval, or have the retrieval request ignored, at the authority \'s discretion.\n\n  ----  \n\nFor example, "readOnly" would be used to mark a database-generated serial number as read-only, while "writeOnly" would be used to mark a password input field.\n\n  ----  \n\nThese keywords can be used to assist in user interface instance generation.  In particular, an application **MAY** choose to use a widget that hides input values as they are typed for write-only fields.\n\n  ----  \n\nOmitting these keywords has the same behavior as values of false.\n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'writeOnly',
    insertText: 'writeOnly',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The value of these keywords **MUST** be a boolean.  When multiple occurrences of these keywords are applicable to a single sub-instance, the resulting value **MUST** be true if any occurrence specifies a true value, and **MUST** be false otherwise.\n\n  ----  \n\nIf "readOnly" has a value of boolean true, it indicates that the value of the instance is managed exclusively by the owning authority, and attempts by an application to modify the value of this property are expected to be ignored or rejected by that owning authority.\n\n  ----  \n\nAn instance document that is marked as "readOnly for the entire document **MAY** be ignored if sent to the owning authority, or **MAY** result in an error, at the authority \'s discretion.\n\n  ----  \n\nIf "writeOnly" has a value of boolean true, it indicates that the value is never present when the instance is retrieved from the owning authority.  It can be present when sent to the owning authority to update or create the document (or the resource it represents), but it will not be included in any updated or newly created version of the instance.\n\n  ----  \n\nAn instance document that is marked as "writeOnly" for the entire document **MAY** be returned as a blank document of some sort, or **MAY** produce an error upon retrieval, or have the retrieval request ignored, at the authority \'s discretion.\n\n  ----  \n\nFor example, "readOnly" would be used to mark a database-generated serial number as read-only, while "writeOnly" would be used to mark a password input field.\n\n  ----  \n\nThese keywords can be used to assist in user interface instance generation.  In particular, an application **MAY** choose to use a widget that hides input values as they are typed for write-only fields.\n\n  ----  \n\nOmitting these keywords has the same behavior as values of false.\n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    target: 'uniqueItems',
    label: 'true',
    insertText: 'true',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'uniqueItems',
    label: 'false',
    insertText: 'false',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'readOnly',
    label: 'true',
    insertText: 'true',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'readOnly',
    label: 'false',
    insertText: 'false',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'writeOnly',
    label: 'true',
    insertText: 'true',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    target: 'writeOnly',
    label: 'false',
    insertText: 'false',
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    kind: 12,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'date-time',
    insertText: 'date-time',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'A string instance is valid against this attribute if it is a valid representation according to the "date-time" production.  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'date',
    insertText: 'date',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'A string instance is valid against this attribute if it is a valid representation according to the "full-date" production.  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'time',
    insertText: 'time',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'A string instance is valid against this attribute if it is a valid representation according to the "full-time" production.  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'email',
    insertText: 'email',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'As defined by <a href="#RFC5322">RFC 5322, section 3.4.1</a> <cite title="NONE">[RFC5322]</cite>.  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'idn-email',
    insertText: 'idn-email',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'As defined by <a href="#RFC6531">RFC 6531</a> <cite title="NONE">[RFC6531]</cite> \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'hostname',
    insertText: 'hostname',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'As defined by <a href="#RFC1034">RFC 1034, section 3.1</a> <cite title="NONE">[RFC1034]</cite>, including host names produced using the Punycode algorithm specified in <a href="#RFC5891">RFC 5891, section 4.4</a> <cite title="NONE">[RFC5891]</cite>.  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'idn-hostname',
    insertText: 'idn-hostname',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'As defined by either RFC 1034 as for hostname, or an internationalized hostname as defined by <a href="#RFC5890">RFC 5890, section 2.3.2.3</a> <cite title="NONE">[RFC5890]</cite>.  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'ipv4',
    insertText: 'ipv4',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'An IPv4 address according to the "dotted-quad" ABNF syntax as defined in <a href="#RFC2673">RFC 2673, section 3.2</a> <cite title="NONE">[RFC2673]</cite>.  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'ipv6',
    insertText: 'ipv6',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'An IPv6 address as defined in <a href="#RFC4291">RFC 4291, section 2.2</a> <cite title="NONE">[RFC4291]</cite>.  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'uri',
    insertText: 'uri',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'A string instance is valid against this attribute if it is a valid URI, according to <a href="#RFC3986">[RFC3986]</a>.  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'uri-reference',
    insertText: 'uri-reference',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'A string instance is valid against this attribute if it is a valid URI Reference (either a URI or a relative-reference), according to <a href="#RFC3986">[RFC3986]</a>.  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'iri',
    insertText: 'iri',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'A string instance is valid against this attribute if it is a valid IRI, according to <a href="#RFC3987">[RFC3987]</a>.  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'iri-reference',
    insertText: 'iri-reference',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'A string instance is valid against this attribute if it is a valid IRI Reference (either an IRI or a relative-reference), according to <a href="#RFC3987">[RFC3987]</a>.  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'uri-template',
    insertText: 'uri-template',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'A string instance is valid against this attribute if it is a valid URI Template (of any level), according to [RFC6570].\n\n ---- \n\nNote that URI Templates may be used for IRIs; there is no separate IRI Template specification.\n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'regex',
    insertText: 'regex',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'A regular expression, which **SHOULD** be valid according to the ECMA 262 [ecma262] regular expression dialect.\\n\\n ---- \\n\\nImplementations that validate formats **MUST** accept at least the subset of ECMA 262 defined in the Regular Expressions (<a href="#section-4.3">Section 4.3</a>) section of this specification, and SHOULD accept all valid ECMA 262 expressions.',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'json-pointer',
    insertText: 'json-pointer',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'A string instance is valid against this attribute if it is a valid JSON string representation of a JSON Pointer, according to <a href="#RFC6901">RFC 6901, section 5</a> <cite title="NONE">[RFC6901]</cite>.  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'relative-json-pointer',
    insertText: 'relative-json-pointer',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value:
        'A string instance is valid against this attribute if it is a valid <a href="#relative-json-pointer">Relative JSON Pointer</a> <cite title="NONE">[relative-json-pointer]</cite>.  \n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'password',
    insertText: 'password',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value: 'A hint to UIs to obscure input.\n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'int32',
    insertText: 'int32',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['integer'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value: 'Signed 32 bits.\n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'int64',
    insertText: 'int64',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['number'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value: 'Signed 64 bits.\n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'float',
    insertText: 'float',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['number'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value: 'float value.\n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'double',
    insertText: 'double',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['number'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value: 'double value.\n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'byte',
    insertText: 'byte',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value: 'base64 encoded characters.\n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'format',
    label: 'binary',
    insertText: 'binary',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'type' }],
        function: 'apilintContainsValue',
        params: ['string'],
      },
    ],
    documentation: {
      kind: 'markdown',
      value: 'Any sequence of octets.\n\n',
    },
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'discriminator',
    insertText: 'discriminator',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Adds support for polymorphism. The discriminator is the schema property name that is used to differentiate between other schema that inherit this schema. The property name used MUST be defined at this schema and it MUST be in the `required` property list. When used, the value MUST be the name of this schema or any schema that inherits it.',
    },
    targetSpecs: OpenAPI2,
  },
  {
    label: 'discriminator',
    insertText: 'discriminator',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Adds support for polymorphism. The discriminator is an object name that is used to differentiate between other schemas which may satisfy the payload description. See [Composition and Inheritance](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaComposition) for more details.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'discriminator',
    insertText: 'discriminator',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Adds support for polymorphism. The discriminator is an object name that is used to differentiate between other schemas which may satisfy the payload description. See [Composition and Inheritance](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaComposition) for more details.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'discriminator',
    insertText: 'discriminator',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Adds support for polymorphism. The discriminator is the schema property name that is used to differentiate between other schema that inherit this schema. The property name used MUST be defined at this schema and it **MUST** be in the `required` property list. When used, the value MUST be the name of this schema or any schema that inherits it. See [Composition and Inheritance](https://www.asyncapi.com/docs/specifications/v2.6.0#schemaComposition) for more details.\n\n',
    },
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'discriminator',
    label: 'discriminator',
    insertText: '?',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    function: 'apicompleteDiscriminator',
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'required' }],
        function: 'apilintArrayOfType',
        params: ['string', true],
      },
    ],
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'required',
    label: 'required',
    insertText: '?',
    arrayMember: true,
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    function: 'apicompleteRequired',
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'xml',
    insertText: 'xml',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'This MAY be used only on properties schemas. It has no effect on root schemas. Adds Additional metadata to describe the XML representation format of this property.',
    },
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'externalDocs',
    insertText: 'externalDocs',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Additional external documentation for this schema.',
    },
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'externalDocs',
    insertText: 'externalDocs',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Additional external documentation for this schema.',
    },
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
  {
    label: 'externalDocs',
    insertText: 'externalDocs',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Allows referencing an external resource for extended documentation. See [External Documentation Object](https://www.asyncapi.com/docs/specifications/v2.6.0#externalDocumentationObject)\n',
    },
    targetSpecs: AsyncAPI2,
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
        'Specifies that a schema is deprecated and **SHOULD** be transitioned out of usage. Default value is `false`.',
    },
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'deprecated',
    label: 'true',
    insertText: 'true',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    target: 'deprecated',
    label: 'false',
    insertText: 'false',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  },
  {
    target: 'type',
    label: 'null',
    insertText: 'null',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI31],
  },
  {
    target: 'type',
    label: 'boolean',
    insertText: 'boolean',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'type',
    label: 'object',
    insertText: 'object',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'type',
    label: 'array',
    insertText: 'array',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'type',
    label: 'number',
    insertText: 'number',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'type',
    label: 'string',
    insertText: 'string',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'type',
    label: 'integer',
    insertText: 'integer',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
  },
];

export default completion;
