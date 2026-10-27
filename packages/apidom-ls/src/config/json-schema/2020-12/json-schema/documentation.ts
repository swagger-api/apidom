import { DocumentationMeta } from '../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../target-specs.ts';

const documentation: DocumentationMeta[] = [
  {
    target: '$id',
    docs: '#### [$id](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-8.2.1)\n\nThe "$id" keyword identifies a schema resource with its canonical [RFC6596] URI.\n\nNote that this URI is an identifier and not necessarily a network locator. In the case of a network-addressable URL, a schema need not be downloadable from its canonical URI.\n\nIf present, the value for this keyword MUST be a string, and MUST represent a valid URI-reference [RFC3986]. This URI-reference SHOULD be normalized, and MUST resolve to an absolute-URI [RFC3986] (without a fragment), or to a URI with an empty fragment.\n\nTherefore, "$id" MUST NOT contain a non-empty fragment, and SHOULD NOT contain an empty fragment. The absolute-URI form MUST be considered the canonical URI, regardless of the presence or absence of an empty fragment. An empty fragment is currently allowed because older meta-schemas have an empty fragment in their $id (or previously, id). A future draft may outright forbid even empty fragments in "$id".',
    targetSpecs: JSONSchema202012,
  },
  {
    target: '$schema',
    docs: '#### [$schema](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-8.1.1)\n\nThe "$schema" keyword is both used as a JSON Schema dialect identifier and as the identifier of a resource which is itself a JSON Schema, which describes the set of valid schemas written for this particular dialect.\n\nThe value of this keyword MUST be a URI [RFC3986] (containing a scheme) and this URI MUST be normalized. The current schema MUST be valid against the meta-schema identified by this URI.\n\nThe "$schema" keyword SHOULD be used in the document root schema object, and MAY be used in the root schema objects of embedded schema resources. It MUST NOT appear in non-resource root schema objects. If absent from the document root schema, the resulting behavior is implementation-defined.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: '$ref',
    docs: '#### [$ref](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-8.2.3.1)\n\nThe "$ref" keyword is an applicator that is used to reference a statically identified schema. Its results are the results of the referenced schema. Note that this definition of how the results are determined means that other keywords can appear alongside of "$ref" in the same schema object.\n\nThe value of the "$ref" keyword MUST be a string which is a URI-Reference. Resolved against the current URI base, it produces the URI of the schema to apply. This resolution is safe to perform on schema load, as the process of evaluating an instance cannot change how the reference resolves.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: '$comment',
    docs: '#### [$comment](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-8.3)\n\nThis keyword reserves a location for comments from schema authors to readers or maintainers of the schema.\n\nThe value of this keyword MUST be a string. Implementations MUST NOT present this string to end users. Tools for editing schemas SHOULD support displaying and editing this keyword. The value of this keyword MAY be used in debug or error output which is intended for developers making use of schemas.\n\nImplementations MUST NOT take any other action based on the presence, absence, or contents of "$comment" properties. In particular, the value of "$comment" MUST NOT be collected as an annotation result.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: '$anchor',
    docs: '#### [$anchor](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-8.2.2)\n\nThe "$anchor" and "$dynamicAnchor" keywords are used to specify such fragments. They are identifier keywords that can only be used to create plain name fragments, rather than absolute URIs as seen with "$id".\n\nIn most cases, the normal fragment behavior both suffices and is more intuitive. Therefore it is RECOMMENDED that "$anchor" be used to create plain name fragments unless there is a clear need for "$dynamicAnchor".\n\nIf present, the value of this keyword MUST be a string and MUST start with a letter ([A-Za-z]) or underscore ("_"), followed by any number of letters, digits ([0-9]), hyphens ("-"), underscores ("_"), and periods ("."). This matches the US-ASCII part of XML\'s NCName production [xml-names]. Note that the anchor string does not include the "#" character, as it is not a URI-reference. An "$anchor": "foo" becomes the fragment "#foo" when used in a URI.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: '$dynamicRef',
    docs: '#### [$dynamicRef](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-8.2.3.2)\n\nThe "$dynamicRef" keyword is an applicator that allows for deferring the full resolution until runtime, at which point it is resolved each time it is encountered while evaluating an instance.\n\nTogether with "$dynamicAnchor", "$dynamicRef" implements a cooperative extension mechanism that is primarily useful with recursive schemas (schemas that reference themselves). Both the extension point and the runtime-determined extension target are defined with "$dynamicAnchor", and only exhibit runtime dynamic behavior when referenced with "$dynamicRef".\n\nThe value of the "$dynamicRef" property MUST be a string which is a URI-Reference. Resolved against the current URI base, it produces the URI used as the starting point for runtime resolution. This initial resolution is safe to perform on schema load.\n\nIf the initially resolved starting point URI includes a fragment that was created by the "$dynamicAnchor" keyword, the initial URI MUST be replaced by the URI (including the fragment) for the outermost schema resource in the dynamic scope (Section 7.1) that defines an identically named fragment with "$dynamicAnchor".\n\nOtherwise, its behavior is identical to "$ref", and no runtime resolution is needed.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: '$dynamicAnchor',
    docs: '#### [$dynamicAnchor](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-8.2.2)\n\nThe "$anchor" and "$dynamicAnchor" keywords are used to specify such fragments. They are identifier keywords that can only be used to create plain name fragments, rather than absolute URIs as seen with "$id".\n\nSeparately from the usual usage of URIs, "$dynamicAnchor" indicates that the fragment is an extension point when used with the "$dynamicRef" keyword. This low-level, advanced feature makes it easier to extend recursive schemas such as the meta-schemas, without imposing any particular semantics on that extension. See the section on "$dynamicRef" (Section 8.2.3.2) for details.\n\nIf present, the value of this keyword MUST be a string and MUST start with a letter ([A-Za-z]) or underscore ("_"), followed by any number of letters, digits ([0-9]), hyphens ("-"), underscores ("_"), and periods ("."). This matches the US-ASCII part of XML\'s NCName production [xml-names]. Note that the anchor string does not include the "#" character, as it is not a URI-reference. An "$anchor": "foo" becomes the fragment "#foo" when used in a URI.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: '$vocabulary',
    docs: '#### [$vocabulary](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-8.1.2)\n\nThe "$vocabulary" keyword is used in meta-schemas to identify the vocabularies available for use in schemas described by that meta-schema. It is also used to indicate whether each vocabulary is required or optional, in the sense that an implementation MUST understand the required vocabularies in order to successfully process the schema. Together, this information forms a dialect. Any vocabulary that is understood by the implementation MUST be processed in a manner consistent with the semantic definitions contained within the vocabulary.\n\nThe value of this keyword MUST be an object. The property names in the object MUST be URIs (containing a scheme) and this URI MUST be normalized. Each URI that appears as a property name identifies a specific set of keywords and their semantics.\n\nThe values of the object properties MUST be booleans. If the value is true, then implementations that do not recognize the vocabulary MUST refuse to process any schemas that declare this meta-schema with "$schema". If the value is false, implementations that do not recognize the vocabulary SHOULD proceed with processing such schemas. The value has no impact if the implementation understands the vocabulary.\n\nThe "$vocabulary" keyword SHOULD be used in the root schema of any schema document intended for use as a meta-schema. It MUST NOT appear in subschemas.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: '$defs',
    docs: '#### [$defs](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-8.2.4)\n\nThe "$defs" keyword reserves a location for schema authors to inline re-usable JSON Schemas into a more general schema. The keyword does not directly affect the validation result.\n\nThis keyword\'s value MUST be an object. Each member value of this object MUST be a valid JSON Schema.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'prefixItems',
    docs: '#### [prefixItems](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.3.1.1)\n\nThe value of "prefixItems" MUST be a non-empty array of valid JSON Schemas.\n\nValidation succeeds if each element of the instance validates against the schema at the same position, if any. This keyword does not constrain the length of the array. If the array is longer than this keyword\'s value, this keyword validates only the prefix of matching length.\n\nOmitting this keyword has the same assertion behavior as an empty array.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'items',
    docs: '#### [items](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.3.1.2)\n\nThe value of "items" MUST be a valid JSON Schema.\n\nThis keyword applies its subschema to all instance elements at indexes greater than the length of the "prefixItems" array in the same schema object, as reported by the annotation result of that "prefixItems" keyword. If no such annotation result exists, "items" applies its subschema to all instance array elements. Note that the behavior of "items" without "prefixItems" is identical to that of the schema form of "items" in prior drafts. When "prefixItems" is present, the behavior of "items" is identical to the former "additionalItems" keyword.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'contains',
    docs: '#### [contains](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.3.1.3)\n\nThe value of this keyword MUST be a valid JSON Schema.\n\nAn array instance is valid against "contains" if at least one of its elements is valid against the given schema, except when "minContains" is present and has a value of 0, in which case an array instance MUST be considered valid against the "contains" keyword, even if none of its elements is valid against the given schema.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'additionalProperties',
    docs: '#### [additionalProperties](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.3.2.3)\n\nThe value of "additionalProperties" MUST be a valid JSON Schema.\n\nThe behavior of this keyword depends on the presence and annotation results of "properties" and "patternProperties" within the same schema object. Validation with "additionalProperties" applies only to the child values of instance names that do not appear in the annotation results of either "properties" or "patternProperties".\n\nFor all such properties, validation succeeds if the child instance validates against the "additionalProperties" schema.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'properties',
    docs: '#### [properties](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.3.2.1)\n\nThe value of "properties" MUST be an object. Each value of this object MUST be a valid JSON Schema.\n\nValidation succeeds if, for each name that appears in both the instance and as a name within this keyword\'s value, the child instance for that name successfully validates against the corresponding schema.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'patternProperties',
    docs: '#### [patternProperties](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.3.2.2)\n\nThe value of "patternProperties" MUST be an object. Each property name of this object SHOULD be a valid regular expression, according to the ECMA-262 regular expression dialect. Each property value of this object MUST be a valid JSON Schema.\n\nValidation succeeds if, for each instance name that matches any regular expressions that appear as a property name in this keyword\'s value, the child instance for that name successfully validates against each schema that corresponds to a matching regular expression.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'dependentSchemas',
    docs: "#### [dependentSchemas](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.2.2.4)\n\nThis keyword specifies subschemas that are evaluated if the instance is an object and contains a certain property.\n\nThis keyword's value MUST be an object. Each value in the object MUST be a valid JSON Schema.\n\nIf the object key is a property in the instance, the entire instance must validate against the subschema. Its use is dependent on the presence of the property.",
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'propertyNames',
    docs: '#### [propertyNames](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.3.2.4)\n\nThe value of "propertyNames" MUST be a valid JSON Schema.\n\nIf the instance is an object, this keyword validates if every property name in the instance validates against the provided schema. Note the property name that the schema is testing will always be a string.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'if',
    docs: '#### [if](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.2.2.1)\n\nThis keyword\'s value MUST be a valid JSON Schema.\n\nThis validation outcome of this keyword\'s subschema has no direct effect on the overall validation result. Rather, it controls which of the "then" or "else" keywords are evaluated.\n\nInstances that successfully validate against this keyword\'s subschema MUST also be valid against the subschema value of the "then" keyword, if present.\n\nInstances that fail to validate against this keyword\'s subschema MUST also be valid against the subschema value of the "else" keyword, if present.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'then',
    docs: '#### [then](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.2.2.2)\n\nThis keyword\'s value MUST be a valid JSON Schema.\n\nWhen "if" is present, and the instance successfully validates against its subschema, then validation succeeds against this keyword if the instance also successfully validates against this keyword\'s subschema.\n\nThis keyword has no effect when "if" is absent, or when the instance fails to validate against its subschema. Implementations MUST NOT evaluate the instance against this keyword, for either validation or annotation collection purposes, in such cases.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'else',
    docs: '#### [else](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.2.2.3)\n\nThis keyword\'s value MUST be a valid JSON Schema.\n\nWhen "if" is present, and the instance fails to validate against its subschema, then validation succeeds against this keyword if the instance successfully validates against this keyword\'s subschema.\n\nThis keyword has no effect when "if" is absent, or when the instance successfully validates against its subschema. Implementations MUST NOT evaluate the instance against this keyword, for either validation or annotation collection purposes, in such cases.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'allOf',
    docs: "#### [allOf](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.2.1.1)\n\nThis keyword's value MUST be a non-empty array. Each item of the array MUST be a valid JSON Schema.\n\nAn instance validates successfully against this keyword if it validates successfully against all schemas defined by this keyword's value.",
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'anyOf',
    docs: "#### [anyOf](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.2.1.2)\n\nThis keyword's value MUST be a non-empty array. Each item of the array MUST be a valid JSON Schema.\n\nAn instance validates successfully against this keyword if it validates successfully against at least one schema defined by this keyword's value. Note that when annotations are being collected, all subschemas MUST be examined so that annotations are collected from each subschema that validates successfully.",
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'oneOf',
    docs: "#### [oneOf](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.2.1.3)\n\nThis keyword's value MUST be a non-empty array. Each item of the array MUST be a valid JSON Schema.\n\nAn instance validates successfully against this keyword if it validates successfully against exactly one schema defined by this keyword's value.",
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'not',
    docs: "#### [not](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.2.1.4)\n\nThis keyword's value MUST be a valid JSON Schema.\n\nAn instance is valid against this keyword if it fails to validate successfully against the schema defined by this keyword.",
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'unevaluatedItems',
    docs: '#### [unevaluatedItems](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-11.2)\n\nThe value of "unevaluatedItems" MUST be a valid JSON Schema.\n\nIf no relevant annotations are present, the "unevaluatedItems" subschema MUST be applied to all locations in the array. If a boolean true value is present from any of the relevant annotations, "unevaluatedItems" MUST be ignored. Otherwise, the subschema MUST be applied to any index greater than the largest annotation value for "prefixItems", which does not appear in any annotation value for "contains".',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'unevaluatedProperties',
    docs: '#### [unevaluatedProperties](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-11.3)\n\nThe value of "unevaluatedProperties" MUST be a valid JSON Schema.\n\nThe behavior of this keyword depends on the annotation results of adjacent keywords that apply to the instance location being validated. Specifically, the annotations from "properties", "patternProperties", and "additionalProperties", which can come from those keywords when they are adjacent to the "unevaluatedProperties" keyword. Those three annotations, as well as "unevaluatedProperties", can also result from any and all adjacent in-place applicator (Section 10.2) keywords. This includes but is not limited to the in-place applicators defined in this document.\n\nValidation with "unevaluatedProperties" applies only to the child values of instance names that do not appear in the "properties", "patternProperties", "additionalProperties", or "unevaluatedProperties" annotation results that apply to the instance location being validated.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'type',
    docs: '#### [type](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.1.1)\n\nThe value of this keyword MUST be either a string or an array. If it is an array, elements of the array MUST be strings and MUST be unique.\n\nString values MUST be one of the six primitive types ("null", "boolean", "object", "array", "number", or "string"), or "integer" which matches any number with a zero fractional part.\n\nIf the value of "type" is a string, then an instance validates successfully if its type matches the type represented by the value of the string. If the value of "type" is an array, then an instance validates successfully if its type matches any of the types indicated by the strings in the array.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'const',
    docs: '#### [const](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.1.3)\n\nThe value of this keyword MAY be of any type, including null.\n\nUse of this keyword is functionally equivalent to an "enum" (Section 6.1.2) with a single value.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'enum',
    docs: "#### [enum](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.1.2)\n\nThe value of this keyword MUST be an array. This array SHOULD have at least one element. Elements in the array SHOULD be unique.\n\nAn instance validates successfully against this keyword if its value is equal to one of the elements in this keyword's array value.\n\nElements in the array might be of any type, including null.",
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'multipleOf',
    docs: '#### [multipleOf](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.2.1)\n\nThe value of "multipleOf" MUST be a number, strictly greater than 0.\n\nA numeric instance is valid only if division by this keyword\'s value results in an integer.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'maximum',
    docs: '#### [maximum](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.2.2)\n\nThe value of "maximum" MUST be a number, representing an inclusive upper limit for a numeric instance.\n\nIf the instance is a number, then this keyword validates only if the instance is less than or exactly equal to "maximum".',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'exclusiveMaximum',
    docs: '#### [exclusiveMaximum](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.2.3)\n\nThe value of "exclusiveMaximum" MUST be a number, representing an exclusive upper limit for a numeric instance.\n\nIf the instance is a number, then the instance is valid only if it has a value strictly less than (not equal to) "exclusiveMaximum".',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'minimum',
    docs: '#### [minimum](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.2.4)\n\nThe value of "minimum" MUST be a number, representing an inclusive lower limit for a numeric instance.\n\nIf the instance is a number, then this keyword validates only if the instance is greater than or exactly equal to "minimum".',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'exclusiveMinimum',
    docs: '#### [exclusiveMinimum](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.2.5)\n\nThe value of "exclusiveMinimum" MUST be a number, representing an exclusive lower limit for a numeric instance.\n\nIf the instance is a number, then the instance is valid only if it has a value strictly greater than (not equal to) "exclusiveMinimum".',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'maxLength',
    docs: '#### [maxLength](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.3.1)\n\nThe value of this keyword MUST be a non-negative integer.\n\nA string instance is valid against this keyword if its length is less than, or equal to, the value of this keyword.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'minLength',
    docs: '#### [minLength](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.3.2)\n\nThe value of this keyword MUST be a non-negative integer.\n\nA string instance is valid against this keyword if its length is greater than, or equal to, the value of this keyword.\n\nOmitting this keyword has the same behavior as a value of 0.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'pattern',
    docs: '#### [pattern](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.3.3)\n\nThe value of this keyword MUST be a string. This string SHOULD be a valid regular expression, according to the ECMA-262 regular expression dialect.\n\nA string instance is considered valid if the regular expression matches the instance successfully. Recall: regular expressions are not implicitly anchored.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'maxItems',
    docs: '#### [maxItems](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.4.1)\n\nThe value of this keyword MUST be a non-negative integer.\n\nAn array instance is valid against "maxItems" if its size is less than, or equal to, the value of this keyword.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'minItems',
    docs: '#### [minItems](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.4.2)\n\nThe value of this keyword MUST be a non-negative integer.\n\nAn array instance is valid against "minItems" if its size is greater than, or equal to, the value of this keyword.\n\nOmitting this keyword has the same behavior as a value of 0.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'uniqueItems',
    docs: '#### [uniqueItems](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.4.3)\n\nThe value of this keyword MUST be a boolean.\n\nIf this keyword has boolean value false, the instance validates successfully. If it has boolean value true, the instance validates successfully if all of its elements are unique.\n\nOmitting this keyword has the same behavior as a value of false.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'maxContains',
    docs: '#### [maxContains](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.4.4)\n\nThe value of this keyword MUST be a non-negative integer.\n\nIf "contains" is not present within the same schema object, then this keyword has no effect.\n\nAn instance array is valid against "maxContains" in two ways, depending on the form of the annotation result of an adjacent "contains" [json-schema] keyword. The first way is if the annotation result is an array and the length of that array is less than or equal to the "maxContains" value. The second way is if the annotation result is a boolean "true" and the instance array length is less than or equal to the "maxContains" value.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'minContains',
    docs: '#### [minContains](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.4.5)\n\nThe value of this keyword MUST be a non-negative integer.\n\nIf "contains" is not present within the same schema object, then this keyword has no effect.\n\nAn instance array is valid against "minContains" in two ways, depending on the form of the annotation result of an adjacent "contains" [json-schema] keyword. The first way is if the annotation result is an array and the length of that array is greater than or equal to the "minContains" value. The second way is if the annotation result is a boolean "true" and the instance array length is greater than or equal to the "minContains" value.\n\nA value of 0 is allowed, but is only useful for setting a range of occurrences from 0 to the value of "maxContains". A value of 0 causes "minContains" and "contains" to always pass validation (but validation can still fail against a "maxContains" keyword).',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'maxProperties',
    docs: '#### [maxProperties](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.5.1)\n\nThe value of this keyword MUST be a non-negative integer.\n\nAn object instance is valid against "maxProperties" if its number of properties is less than, or equal to, the value of this keyword.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'minProperties',
    docs: '#### [minProperties](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.5.2)\n\nThe value of this keyword MUST be a non-negative integer.\n\nAn object instance is valid against "minProperties" if its number of properties is greater than, or equal to, the value of this keyword.\n\nOmitting this keyword has the same behavior as a value of 0.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'required',
    docs: '#### [required](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.5.3)\n\nThe value of this keyword MUST be an array. Elements of this array, if any, MUST be strings, and MUST be unique.\n\nAn object instance is valid against this keyword if every item in the array is the name of a property in the instance.\n\nOmitting this keyword has the same behavior as an empty array.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'dependentRequired',
    docs: "#### [dependentRequired](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-6.5.4)\n\nThe value of this keyword MUST be an object. Properties in this object, if any, MUST be arrays. Elements in each array, if any, MUST be strings, and MUST be unique.\n\nThis keyword specifies properties that are required if a specific other property is present. Their requirement is dependent on the presence of the other property.\n\nValidation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, every item in the corresponding array is also the name of a property in the instance.",
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'title',
    docs: '#### [title](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-9.1)\n\nThe value of both of these keywords MUST be a string.\n\nBoth of these keywords can be used to decorate a user interface with information about the data produced by this user interface. A title will preferably be short, whereas a description will provide explanation about the purpose of the instance described by this schema.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'description',
    docs: '#### [description](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-9.1)\n\nThe value of both of these keywords MUST be a string.\n\nBoth of these keywords can be used to decorate a user interface with information about the data produced by this user interface. A title will preferably be short, whereas a description will provide explanation about the purpose of the instance described by this schema.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'default',
    docs: '#### [default](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-9.2)\n\nThere are no restrictions placed on the value of this keyword. When multiple occurrences of this keyword are applicable to a single sub-instance, implementations SHOULD remove duplicates.\n\nThis keyword can be used to supply a default JSON value associated with a particular schema. It is RECOMMENDED that a default value be valid against the associated schema.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'deprecated',
    docs: '#### [deprecated](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-9.3)\n\nThe value of this keyword MUST be a boolean. When multiple occurrences of this keyword are applicable to a single sub-instance, applications SHOULD consider the instance location to be deprecated if any occurrence specifies a true value.\n\nIf "deprecated" has a value of boolean true, it indicates that applications SHOULD refrain from usage of the declared property. It MAY mean the property is going to be removed in the future.\n\nA root schema containing "deprecated" with a value of true indicates that the entire resource being described MAY be removed in the future.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'readOnly',
    docs: '#### [readOnly](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-9.4)\n\nThe value of these keywords MUST be a boolean. When multiple occurrences of these keywords are applicable to a single sub-instance, the resulting behavior SHOULD be as for a true value if any occurrence specifies a true value, and SHOULD be as for a false value otherwise.\n\nIf "readOnly" has a value of boolean true, it indicates that the value of the instance is managed exclusively by the owning authority, and attempts by an application to modify the value of this property are expected to be ignored or rejected by that owning authority.\n\nAn instance document that is marked as "readOnly" for the entire document MAY be ignored if sent to the owning authority, or MAY result in an error, at the authority\'s discretion.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'writeOnly',
    docs: '#### [writeOnly](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-9.4)\n\nThe value of these keywords MUST be a boolean. When multiple occurrences of these keywords are applicable to a single sub-instance, the resulting behavior SHOULD be as for a true value if any occurrence specifies a true value, and SHOULD be as for a false value otherwise.\n\nIf "writeOnly" has a value of boolean true, it indicates that the value is never present when the instance is retrieved from the owning authority. It can be present when sent to the owning authority to update or create the document (or the resource it represents), but it will not be included in any updated or newly created version of the instance.\n\nAn instance document that is marked as "writeOnly" for the entire document MAY be returned as a blank document of some sort, or MAY produce an error upon retrieval, or have the retrieval request ignored, at the authority\'s discretion.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'examples',
    docs: '#### [examples](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-9.5)\n\nThe value of this keyword MUST be an array. There are no restrictions placed on the values within the array. When multiple occurrences of this keyword are applicable to a single sub-instance, implementations MUST provide a flat array of all values rather than an array of arrays.\n\nThis keyword can be used to provide sample JSON values associated with a particular schema, for the purpose of illustrating usage. It is RECOMMENDED that these values be valid against the associated schema.\n\nImplementations MAY use the value(s) of "default", if present, as an additional example. If "examples" is absent, "default" MAY still be used in this manner.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'format',
    docs: '#### [format](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-7)\n\nStructural validation alone may be insufficient to allow an application to correctly utilize certain values. The "format" annotation keyword is defined to allow schema authors to convey semantic information for a fixed subset of values which are accurately described by authoritative resources, be they RFCs or other external specifications.\n\nThe value of this keyword is called a format attribute. It MUST be a string. A format attribute can generally only validate a given set of instance types. If the type of the instance to validate is not in this set, validation for this format attribute and instance SHOULD succeed.\n\nThe value of format MUST be collected as an annotation, if the implementation supports annotation collection. This enables application-level validation when schema validation is unavailable or inadequate.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'contentEncoding',
    docs: "#### [contentEncoding](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-8.3)\n\nIf the instance value is a string, this property defines that the string SHOULD be interpreted as encoded binary data and decoded using the encoding named by this property.\n\nPossible values indicating base 16, 32, and 64 encodings with several variations are listed in RFC 4648 [RFC4648]. Additionally, sections 6.7 and 6.8 of RFC 2045 [RFC2045] provide encodings used in MIME. This keyword is derived from MIME's Content-Transfer-Encoding header, which was designed to map binary data into ASCII characters. It is not related to HTTP's Content-Encoding header, which is used to encode (e.g. compress or encrypt) the content of HTTP request and responses.",
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'contentMediaType',
    docs: '#### [contentMediaType](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-8.4)\n\nIf the instance is a string, this property indicates the media type of the contents of the string. If "contentEncoding" is present, this property describes the decoded string.\n\nThe value of this property MUST be a string, which MUST be a media type, as defined by RFC 2046 [RFC2046].',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'contentSchema',
    docs: '#### [contentSchema](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html#section-8.5)\n\nIf the instance is a string, and if "contentMediaType" is present, this property contains a schema which describes the structure of the string.\n\nThe value of this property MUST be a valid JSON schema. It SHOULD be ignored if "contentMediaType" is not present.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'base',
    docs: '#### [base](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.5.1)\n\nIf present, this keyword MUST be first resolved as a URI Template, and then MUST be resolved as a URI Reference against the current URI base of the instance. The result MUST be set as the new URI base for the instance while processing the sub-schema containing "base" and all sub-schemas within it.\n\nThe process for resolving the "base" template can be different when being resolved for use with "anchor" than when being resolved for use with "href", which is explained in detail in the URI Templating section.',
    targetSpecs: JSONSchema202012,
  },
  {
    target: 'links',
    docs: '#### [links](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.5.2)\n\nThe "links" property of schemas is used to associate Link Description Objects with instances. The value of this property MUST be an array, and the items in the array must be Link Description Objects.',
    targetSpecs: JSONSchema202012,
  },
  {
    docs: '#### [JSON Schema 2020-12](https://json-schema.org/draft/2020-12)\n\nA JSON Schema document describes the structure of JSON data. Its root schema identifies the JSON Schema 2020-12 dialect with the `$schema` keyword. A schema is an object or a boolean; an object schema consists of keywords from the Core, Applicator, Unevaluated, Validation, Meta-Data, Format Annotation and Content vocabularies.\n\n- Core: [draft-bhutton-json-schema-01](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html)\n- Validation: [draft-bhutton-json-schema-validation-01](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html)',
    targetSpecs: JSONSchema202012,
  },
];

export default documentation;
