import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { CompletionList, Position } from 'vscode-languageserver-types';

// @ts-ignore
import getLanguageService from '../src/apidom-language-service';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { logPerformance, logLevel } from './test-utils';

const specPayloadEmpty = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async', 'payload', 'payload-empty.yaml'))
  .toString();

describe('asyncapi payload test', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [],
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  after(function () {
    languageService.terminate();
  });

  it('complete empty payload', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specPayloadEmpty.yaml',
      'yaml',
      0,
      specPayloadEmpty,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const completionTestInputValue = [
      'empty message payload',
      6,
      8,
      {
        items: [
          {
            label: 'type',
            insertText: 'type: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of this keyword **MUST** be either a string or an array. If it is an array, elements of the array **MUST** be strings and **MUST** be unique.\n\n  ----  \n\nString values **MUST** be one of the six primitive types ("null", "boolean", "object", "array", "number", or "string"), or "integer" which matches any number with a zero fractional part.\n\n  ----  \n\nAn instance validates if and only if the instance is in any of the sets listed for this keyword.\n\n  ----  \n\n',
            },
          },
          {
            label: 'enum',
            insertText: 'enum: \n  - $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                "The value of this keyword **MUST** be an array. This array **SHOULD** have at least one element. Elements in the array **SHOULD** be unique.\n\n  ----  \n\nAn instance validates successfully against this keyword if its value is equal to one of the elements in this keyword's array value.\n\n  ----  \n\nElements in the array might be of any value, including null.\n\n  ----  \n\n",
            },
          },
          {
            label: 'const',
            insertText: 'const: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of this keyword **MAY** be of any type, including null.\n\n  ----  \n\nAn instance validates successfully against this keyword if its value is equal to the value of the keyword.\n\n  ----  \n\n',
            },
          },
          {
            label: 'multipleOf',
            insertText: 'multipleOf: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of "multipleOf" **MUST** be a number, strictly greater than 0.\n\n  ----  \n\nA numeric instance is valid only if division by this keyword\'s value results in an integer.\n\n  ----  \n\n',
            },
          },
          {
            label: 'maximum',
            insertText: 'maximum: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of "maximum" **MUST** be a number, representing an inclusive upper limit for a numeric instance.\n\n  ----  \n\nIf the instance is a number, then this keyword validates only if the instance is less than or exactly equal to "maximum".\n\n  ----  \n\n',
            },
          },
          {
            label: 'exclusiveMaximum',
            insertText: 'exclusiveMaximum: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of "exclusiveMaximum" **MUST** be number, representing an exclusive upper limit for a numeric instance.\n\n  ----  \n\nIf the instance is a number, then the instance is valid only if it has a value strictly less than (not equal to) "exclusiveMaximum".\n\n  ----  \n\n',
            },
          },
          {
            label: 'minimum',
            insertText: 'minimum: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of "minimum" **MUST** be a number, representing an inclusive lower limit for a numeric instance.\n\n  ----  \n\nIf the instance is a number, then this keyword validates only if the instance is greater than or exactly equal to "minimum".\n\n  ----  \n\n',
            },
          },
          {
            label: 'exclusiveMinimum',
            insertText: 'exclusiveMinimum: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of "exclusiveMinimum" **MUST** be number, representing an exclusive lower limit for a numeric instance.\n\n  ----  \n\nIf the instance is a number, then the instance is valid only if it has a value strictly greater than (not equal to) "exclusiveMinimum".\n\n  ----  \n\n',
            },
          },
          {
            label: 'maxLength',
            insertText: 'maxLength: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of this keyword **MUST** be a non-negative integer.\n\n  ----  \n\nA string instance is valid against this keyword if its length is less than, or equal to, the value of this keyword.\n\n  ----  \n\nThe length of a string instance is defined as the number of its characters as defined by <xref target="RFC7159">RFC 7159</xref>.\n\n  ----  \n\n',
            },
          },
          {
            label: 'minLength',
            insertText: 'minLength: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of this keyword **MUST** be a non-negative integer.\n\n  ----  \n\nA string instance is valid against this keyword if its length is greater than, or equal to, the value of this keyword.\n\n  ----  \n\nThe length of a string instance is defined as the number of its characters as defined by <xref target="RFC7159">RFC 7159</xref>.\n\n  ----  \n\nOmitting this keyword has the same behavior as a value of 0.\n\n  ----  \n\n',
            },
          },
          {
            label: 'pattern',
            insertText: 'pattern: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of this keyword **MUST** be a string. This string **SHOULD** be a valid regular expression, according to the ECMA 262 regular expression dialect.\n\n  ----  \n\nA string instance is considered valid if the regular expression matches the instance successfully. Recall: regular expressions are not implicitly anchored.\n\n  ----  \n\n',
            },
          },
          {
            label: 'items',
            insertText: 'items: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of "items" **MUST** be either a valid JSON Schema or an array of valid JSON Schemas.\n\n  ----  \n\nThis keyword determines how child instances validate for arrays, and does not directly validate the immediate instance itself.\n\n  ----  \n\nIf "items" is a schema, validation succeeds if all elements in the array successfully validate against that schema.\n\n  ----  \n\nIf "items" is an array of schemas, validation succeeds if each element of the instance validates against the schema at the same position, if any.\n\n  ----  \n\nOmitting this keyword has the same behavior as an empty schema.\n\n  ----  \n\n',
            },
          },
          {
            label: 'additionalItems',
            insertText: 'additionalItems: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of "additionalItems" **MUST** be a valid JSON Schema.\n\n  ----  \n\nThis keyword determines how child instances validate for arrays, and does not directly validate the immediate instance itself.\n\n  ----  \n\nIf "items" is an array of schemas, validation succeeds if every instance element at a position greater than the size of "items" validates against "additionalItems".\n\n  ----  \n\nOtherwise, "additionalItems" **MUST** be ignored, as the "items" schema (possibly the default value of an empty schema) is applied to all elements.\n\n  ----  \n\nOmitting this keyword has the same behavior as an empty schema.\n\n  ----  \n\n',
            },
          },
          {
            label: 'maxItems',
            insertText: 'maxItems: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of this keyword **MUST** be a non-negative integer.\n\n  ----  \n\nAn array instance is valid against "maxItems" if its size is less than, or equal to, the value of this keyword.\n\n  ----  \n\n',
            },
          },
          {
            label: 'minItems',
            insertText: 'minItems: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of this keyword **MUST** be a non-negative integer.\n\n  ----  \n\nAn array instance is valid against "minItems" if its size is greater than, or equal to, the value of this keyword.\n\n  ----  \n\nOmitting this keyword has the same behavior as a value of 0.\n\n  ----  \n\n',
            },
          },
          {
            label: 'uniqueItems',
            insertText: 'uniqueItems: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of this keyword **MUST** be a boolean.\n\n  ----  \n\nIf this keyword has boolean value false, the instance validates successfully. If it has boolean value true, the instance validates successfully if all of its elements are unique.\n\n  ----  \n\nOmitting this keyword has the same behavior as a value of false.\n\n  ----  \n\n',
            },
          },
          {
            label: 'contains',
            insertText: 'contains: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of this keyword **MUST** be a valid JSON Schema.\n\n  ----  \n\nAn array instance is valid against "contains" if at least one of its elements is valid against the given schema.\n\n  ----  \n\n',
            },
          },
          {
            label: 'maxProperties',
            insertText: 'maxProperties: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of this keyword **MUST** be a non-negative integer.\n\n  ----  \n\nAn object instance is valid against "maxProperties" if its number of properties is less than, or equal to, the value of this keyword.\n\n  ----  \n\n',
            },
          },
          {
            label: 'minProperties',
            insertText: 'minProperties: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of this keyword **MUST** be a non-negative integer.\n\n  ----  \n\nAn object instance is valid against "minProperties" if its number of properties is greater than, or equal to, the value of this keyword.\n\n  ----  \n\nOmitting this keyword has the same behavior as a value of 0.\n\n  ----  \n\n',
            },
          },
          {
            label: '$ref',
            insertText: '\\$ref: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The "$ref" keyword is used to reference a schema, and provides the ability to validate recursive structures through self-reference. \n\n  ----  \n\nAn object schema with a "$ref" property MUST be interpreted as a "$ref" reference. The value of the "$ref" property **MUST** be a URI Reference. \n\n  ----  \n\nResolved against the current URI base, it identifies the URI of a schema to use. All other properties in a "$ref" object **MUST** be ignored. \n\n  ----  \n\nnThe URI is not a network locator, only an identifier. A schema need not be downloadable from the address if it is a network-addressable URL, and implementations **SHOULD NOT** assume they should perform a network operation when they encounter a network-addressable URI. \n\n  ----  \n\nnA schema **MUST NOT** be run into an infinite loop against a schema. For example, if two schemas "#alice" and "#bob" both have an "allOf" property that refers to the other, a naive validator might get stuck in an infinite recursive loop trying to validate the instance. Schemas **SHOULD NOT** make use of infinite recursive nesting like this; the behavior is undefined.`.\n',
            },
          },
          {
            label: 'required',
            insertText: 'required: \n  - $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of this keyword **MUST** be an array. Elements of this array, if any, **MUST** be strings, and **MUST** be unique.\n\n  ----  \n\nAn object instance is valid against this keyword if every item in the array is the name of a property in the instance.\n\n  ----  \n\nOmitting this keyword has the same behavior as an empty array.\n\n  ----  \n\n',
            },
          },
          {
            label: 'properties',
            insertText: 'properties: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of "properties" **MUST** be an object. Each value of this object **MUST** be a valid JSON Schema.\n\n  ----  \n\nThis keyword determines how child instances validate for objects, and does not directly validate the immediate instance itself.\n\n  ----  \n\nValidation succeeds if, for each name that appears in both the instance and as a name within this keyword\'s value, the child instance for that name successfully validates against the corresponding schema.\n\n  ----  \n\nOmitting this keyword has the same behavior as an empty object.\n\n  ----  \n\n',
            },
          },
          {
            label: 'patternProperties',
            insertText: 'patternProperties: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of "patternProperties" **MUST** be an object. Each property name of this object **SHOULD** be a valid regular expression, according to the ECMA 262 regular expression dialect. Each property value of this object **MUST** be a valid JSON Schema.\n\n  ----  \n\nThis keyword determines how child instances validate for objects, and does not directly validate the immediate instance itself. Validation of the primitive instance type against this keyword always succeeds.\n\n  ----  \n\nValidation succeeds if, for each instance name that matches any regular expressions that appear as a property name in this keyword\'s value, the child instance for that name successfully validates against each schema that corresponds to a matching regular expression.\n\n  ----  \n\nOmitting this keyword has the same behavior as an empty object.\n\n  ----  \n\n',
            },
          },
          {
            label: 'additionalProperties',
            insertText: 'additionalProperties: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of "additionalProperties" **MUST** be a valid JSON Schema.\n\n  ----  \n\nThis keyword determines how child instances validate for objects, and does not directly validate the immediate instance itself.\n\n  ----  \n\nValidation with "additionalProperties" applies only to the child values of instance names that do not match any names in "properties", and do not match any regular expression in "patternProperties".\n\n  ----  \n\nFor all such properties, validation succeeds if the child instance validates against the "additionalProperties" schema.\n\n  ----  \n\nOmitting this keyword has the same behavior as an empty schema.\n\n  ----  \n\n',
            },
          },
          {
            label: 'propertyNames',
            insertText: 'propertyNames: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of "propertyNames" **MUST** be a valid JSON Schema.\n\n  ----  \n\nIf the instance is an object, this keyword validates if every property name in the instance validates against the provided schema. Note the property name that the schema is testing will always be a string.\n\n  ----  \n\nOmitting this keyword has the same behavior as an empty schema.\n\n  ----  \n\n',
            },
          },
          {
            label: 'if',
            insertText: 'if: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'This keyword\'s value **MUST** be a valid JSON Schema.\n\n  ----  \n\n   This validation outcome of this keyword\'s subschema has no direct   effect on the overall validation result.  Rather, it controls which   of the "then" or "else" keywords are evaluated.\n\n  ----  \n\n   Instances that successfully validate against this keyword\'s subschema   **MUST** also be valid against the subschema value of the "then" keyword,   if present.\n\n  ----  \n\n   Instances that fail to validate against this keyword\'s subschema **MUST**   also be valid against the subschema value of the "else" keyword, if   present.\n\n  ----  \n\n   If annotations (Section 3.3) are being collected, they are collected   from this keyword\'s subschema in the usual way, including when the   keyword is present without either "then" or "else".',
            },
          },
          {
            label: 'then',
            insertText: 'then: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'This keyword\'s value **MUST** be a valid JSON Schema.\n\n  ----  \n\nWhen "if" is present, and the instance successfully validates against its subschema, then validation succeeds against this keyword if the instance also successfully validates against this keyword\'s subschema.\n\n  ----  \n\nThis keyword has no effect when "if" is absent, or when the instance fails to validate against its subschema.  Implementations **MUST** NOT evaluate the instance against this keyword, for either validation or annotation collection purposes, in such cases.\n\n  ----  \n\n',
            },
          },
          {
            label: 'else',
            insertText: 'else: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'This keyword\'s value **MUST** be a valid JSON Schema.\n\n  ----  \n\nWhen "if" is present, and the instance fails to validate against its subschema, then validation succeeds against this keyword if the instance successfully validates against this keyword\'s subschema.\n\n  ----  \n\nThis keyword has no effect when "if" is absent, or when the instance successfully validates against its subschema.  Implementations **MUST** NOT evaluate the instance against this keyword, for either validation or annotation collection purposes, in such cases.\n\n  ----  \n\n',
            },
          },
          {
            label: 'allOf',
            insertText: 'allOf: \n  - $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                "This keyword's value **MUST** be a non-empty array. Each item of the array **MUST** be a valid JSON Schema.\n\n  ----  \n\nAn instance validates successfully against this keyword if it validates successfully against all schemas defined by this keyword's value.\n\n  ----  \n\n",
            },
          },
          {
            label: 'anyOf',
            insertText: 'anyOf: \n  - $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                "This keyword's value **MUST** be a non-empty array. Each item of the array **MUST** be a valid JSON Schema.\n\n  ----  \n\nAn instance validates successfully against this keyword if it validates successfully against at least one schema defined by this keyword's value.\n\n  ----  \n\n",
            },
          },
          {
            label: 'oneOf',
            insertText: 'oneOf: \n  - $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                "This keyword's value **MUST** be a non-empty array. Each item of the array **MUST** be a valid JSON Schema.\n\n  ----  \n\nAn instance validates successfully against this keyword if it validates successfully against exactly one schema defined by this keyword's value.\n\n  ----  \n\n",
            },
          },
          {
            label: 'not',
            insertText: 'not: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                "This keyword's value **MUST** be a valid JSON Schema.\n\n  ----  \n\nAn instance is valid against this keyword if it fails to validate successfully against the schema defined by this keyword.\n\n  ----  \n\n",
            },
          },
          {
            label: 'contentEncoding',
            insertText: 'contentEncoding: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'If the instance value is a string, this property defines that the string **SHOULD** be interpreted as binary data and decoded using the encoding named by this property. <xref target="RFC2045">RFC 2045, Sec 6.1</xref> lists the possible values for this property.\n\n  ----  \n\nThe value of this property **MUST** be a string.\n\n  ----  \n\nThe value of this property **SHOULD** be ignored if the instance described is not a string.\n\n  ----  \n\n',
            },
          },
          {
            label: 'contentMediaType',
            insertText: 'contentMediaType: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of this property must be a media type, as defined by <xref target="RFC2046">RFC 2046</xref>. This property defines the media type of instances which this schema defines.\n\n  ----  \n\nThe value of this property **MUST** be a string.\n\n  ----  \n\nThe value of this property **SHOULD** be ignored if the instance described is not a string.\n\n  ----  \n\nIf the "contentEncoding" property is not present, but the instance value is a string, then the value of this property **SHOULD** specify a text document type, and the character set **SHOULD** be the character set into which the JSON string value was decoded (for which the default is Unicode).\n\n  ----  \n\n',
            },
          },
          {
            label: 'examples',
            insertText: 'examples: \n  - $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of this keyword **MUST** be an array. There are no restrictions placed on the values within the array. When multiple occurrences of this keyword are applicable to a single sub-instance, implementations **MUST** provide a flat array of all values rather than an array of arrays.\n\n  ----  \n\nThis keyword can be used to provide sample JSON values associated with a particular schema, for the purpose of illustrating usage.  It is RECOMMENDED that these values be valid against the associated schema.\n\n  ----  \n\nImplementations **MAY** use the value(s) of "default", if present, as an additional example.  If "examples" is absent, "default" **MAY** still be used in this manner.\n\n  ----  \n\n',
            },
          },
          {
            label: 'format',
            insertText: 'format: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'Structural validation alone may be insufficient to validate that an instance meets all the requirements of an application. The "format" keyword is defined to allow interoperable semantic validation for a fixed subset of values which are accurately described by authoritative resources, be they RFCs or other external specifications.\n\n  ----  \n\nThe value of this keyword is called a format attribute. It **MUST** be a  string. A format attribute can generally only validate a given set  of instance types. If the type of the instance to validate is not in  this set, validation for this format attribute and instance **SHOULD**  succeed.\n\n',
            },
          },
          {
            label: 'title',
            insertText: 'title: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of "title" and "description" MUST be a string.\n\n  ----  \n\nBoth of these keywords can be used to decorate a user interface with information about the data produced by this user interface. A title will preferably be short, whereas a description will provide explanation about the purpose of the instance described by this schema.\n\n',
            },
          },
          {
            label: 'description',
            insertText: 'description: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of "title" and "description" MUST be a string.\n\n  ----  \n\nBoth of these keywords can be used to decorate a user interface with information about the data produced by this user interface. A title will preferably be short, whereas a description will provide explanation about the purpose of the instance described by this schema.\n\n',
            },
          },
          {
            label: 'default',
            insertText: 'default: $1',
            kind: 14,
            insertTextFormat: 2,
            targetSpecs: [
              {
                namespace: 'asyncapi',
                version: '2.0.0',
              },
              {
                namespace: 'asyncapi',
                version: '2.1.0',
              },
              {
                namespace: 'asyncapi',
                version: '2.2.0',
              },
            ],
            documentation: {
              kind: 'markdown',
              value:
                'The default value represents what would be assumed by the consumer of the input as the value of the schema if one is not provided. Unlike JSON Schema, the value MUST conform to the defined type for the Schema Object defined at the same level. For example, of `type` is `string`, then `default` can be `"foo"` but cannot be `1`.',
            },
          },
          {
            label: 'readOnly',
            insertText: 'readOnly: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of these keywords **MUST** be a boolean.  When multiple occurrences of these keywords are applicable to a single sub-instance, the resulting value **MUST** be true if any occurrence specifies a true value, and **MUST** be false otherwise.\n\n  ----  \n\nIf "readOnly" has a value of boolean true, it indicates that the value of the instance is managed exclusively by the owning authority, and attempts by an application to modify the value of this property are expected to be ignored or rejected by that owning authority.\n\n  ----  \n\nAn instance document that is marked as "readOnly for the entire document **MAY** be ignored if sent to the owning authority, or **MAY** result in an error, at the authority \'s discretion.\n\n  ----  \n\nIf "writeOnly" has a value of boolean true, it indicates that the value is never present when the instance is retrieved from the owning authority.  It can be present when sent to the owning authority to update or create the document (or the resource it represents), but it will not be included in any updated or newly created version of the instance.\n\n  ----  \n\nAn instance document that is marked as "writeOnly" for the entire document **MAY** be returned as a blank document of some sort, or **MAY** produce an error upon retrieval, or have the retrieval request ignored, at the authority \'s discretion.\n\n  ----  \n\nFor example, "readOnly" would be used to mark a database-generated serial number as read-only, while "writeOnly" would be used to mark a password input field.\n\n  ----  \n\nThese keywords can be used to assist in user interface instance generation.  In particular, an application **MAY** choose to use a widget that hides input values as they are typed for write-only fields.\n\n  ----  \n\nOmitting these keywords has the same behavior as values of false.\n\n',
            },
          },
          {
            label: 'writeOnly',
            insertText: 'writeOnly: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                'The value of these keywords **MUST** be a boolean.  When multiple occurrences of these keywords are applicable to a single sub-instance, the resulting value **MUST** be true if any occurrence specifies a true value, and **MUST** be false otherwise.\n\n  ----  \n\nIf "readOnly" has a value of boolean true, it indicates that the value of the instance is managed exclusively by the owning authority, and attempts by an application to modify the value of this property are expected to be ignored or rejected by that owning authority.\n\n  ----  \n\nAn instance document that is marked as "readOnly for the entire document **MAY** be ignored if sent to the owning authority, or **MAY** result in an error, at the authority \'s discretion.\n\n  ----  \n\nIf "writeOnly" has a value of boolean true, it indicates that the value is never present when the instance is retrieved from the owning authority.  It can be present when sent to the owning authority to update or create the document (or the resource it represents), but it will not be included in any updated or newly created version of the instance.\n\n  ----  \n\nAn instance document that is marked as "writeOnly" for the entire document **MAY** be returned as a blank document of some sort, or **MAY** produce an error upon retrieval, or have the retrieval request ignored, at the authority \'s discretion.\n\n  ----  \n\nFor example, "readOnly" would be used to mark a database-generated serial number as read-only, while "writeOnly" would be used to mark a password input field.\n\n  ----  \n\nThese keywords can be used to assist in user interface instance generation.  In particular, an application **MAY** choose to use a widget that hides input values as they are typed for write-only fields.\n\n  ----  \n\nOmitting these keywords has the same behavior as values of false.\n\n',
            },
          },
          {
            label: 'discriminator',
            insertText: 'discriminator: $1',
            kind: 14,
            insertTextFormat: 2,
            targetSpecs: [
              {
                namespace: 'asyncapi',
                version: '2.0.0',
              },
              {
                namespace: 'asyncapi',
                version: '2.1.0',
              },
              {
                namespace: 'asyncapi',
                version: '2.2.0',
              },
            ],
            documentation: {
              kind: 'markdown',
              value:
                'Adds support for polymorphism. The discriminator is the schema property name that is used to differentiate between other schema that inherit this schema. The property name used MUST be defined at this schema and it **MUST** be in the `required` property list. When used, the value MUST be the name of this schema or any schema that inherits it. See [Composition and Inheritance](https://www.asyncapi.com/docs/specifications/v2.2.0#schemaComposition) for more details.\n\n',
            },
          },
          {
            label: 'externalDocs',
            insertText: 'externalDocs: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            targetSpecs: [
              {
                namespace: 'asyncapi',
                version: '2.0.0',
              },
              {
                namespace: 'asyncapi',
                version: '2.1.0',
              },
              {
                namespace: 'asyncapi',
                version: '2.2.0',
              },
            ],
            documentation: {
              kind: 'markdown',
              value:
                'Allows referencing an external resource for extended documentation. See [External Documentation Object](https://www.asyncapi.com/docs/specifications/v2.2.0#externalDocumentationObject)\n',
            },
          },
          {
            label: 'deprecated',
            insertText: 'deprecated: $1',
            kind: 14,
            insertTextFormat: 2,
            targetSpecs: [
              {
                namespace: 'asyncapi',
                version: '2.0.0',
              },
              {
                namespace: 'asyncapi',
                version: '2.1.0',
              },
              {
                namespace: 'asyncapi',
                version: '2.2.0',
              },
            ],
            documentation: {
              kind: 'markdown',
              value:
                'Specifies that a schema is deprecated and **SHOULD** be transitioned out of usage. Default value is `false`.',
            },
          },
        ],
        isIncomplete: false,
      },
    ];

    const pos = Position.create(
      completionTestInputValue[1] as number,
      completionTestInputValue[2] as number,
    );
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );
    console.log(JSON.stringify(result, null, 2));
    assert.deepEqual(result, completionTestInputValue[3] as CompletionList);
  });
});
