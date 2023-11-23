import {
  StringElement,
  ObjectElement,
  NumberElement,
  ArrayElement,
  BooleanElement,
  Element,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import XmlElement from './Xml';
import DiscriminatorElement from './Discriminator';
import ExternalDocumentationElement from './ExternalDocumentation';

class Schema extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'schema';
  }

  /**
   * Core vocabulary
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/core
   */

  get $schema(): StringElement | undefined {
    return this.get('$schema');
  }

  set $schema($schema: StringElement | undefined) {
    this.set('$schema', $schema);
  }

  get $vocabulary(): ObjectElement | undefined {
    return this.get('$vocabulary');
  }

  set $vocabulary($vocabulary: ObjectElement | undefined) {
    this.set('$vocabulary', $vocabulary);
  }

  get $id(): StringElement | undefined {
    return this.get('$id');
  }

  set $id($id: StringElement | undefined) {
    this.set('$id', $id);
  }

  get $anchor(): StringElement | undefined {
    return this.get('$anchor');
  }

  set $anchor($anchor: StringElement | undefined) {
    this.set('$anchor', $anchor);
  }

  get $dynamicAnchor(): StringElement | undefined {
    return this.get('$dynamicAnchor');
  }

  set $dynamicAnchor($dynamicAnchor: StringElement | undefined) {
    this.set('$dynamicAnchor', $dynamicAnchor);
  }

  get $dynamicRef(): StringElement | undefined {
    return this.get('$dynamicRef');
  }

  set $dynamicRef($dynamicRef: StringElement | undefined) {
    this.set('$dynamicRef', $dynamicRef);
  }

  get $ref(): StringElement | undefined {
    return this.get('$ref');
  }

  set $ref($ref: StringElement | undefined) {
    this.set('$ref', $ref);
  }

  get $defs(): ObjectElement | undefined {
    return this.get('$defs');
  }

  set $defs($defs: ObjectElement | undefined) {
    this.set('$defs', $defs);
  }

  get $comment(): StringElement | undefined {
    return this.get('$comment');
  }

  set $comment($comment: StringElement | undefined) {
    this.set('$comment', $comment);
  }

  /**
   * Applicator vocabulary
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/applicator
   */

  get allOf(): ArrayElement | undefined {
    return this.get('allOf');
  }

  set allOf(allOf: ArrayElement | undefined) {
    this.set('allOf', allOf);
  }

  get anyOf(): ArrayElement | undefined {
    return this.get('anyOf');
  }

  set anyOf(anyOf: ArrayElement | undefined) {
    this.set('anyOf', anyOf);
  }

  get oneOf(): ArrayElement | undefined {
    return this.get('oneOf');
  }

  set oneOf(oneOf: ArrayElement | undefined) {
    this.set('oneOf', oneOf);
  }

  get not(): Schema | undefined {
    return this.get('not');
  }

  set not(not: Schema | undefined) {
    this.set('not', not);
  }

  get if(): Schema | undefined {
    return this.get('if');
  }

  set if(ifSchema: Schema | undefined) {
    this.set('if', ifSchema);
  }

  get then(): Schema | undefined {
    return this.get('then');
  }

  set then(thenSchema: Schema | undefined) {
    this.set('then', thenSchema);
  }

  get else(): Schema | undefined {
    return this.get('else');
  }

  set else(elseSchema: Schema | undefined) {
    this.set('else', elseSchema);
  }

  get dependentSchemas(): ObjectElement | undefined {
    return this.get('dependentSchemas');
  }

  set dependentSchemas(dependentSchemas: ObjectElement | undefined) {
    this.set('dependentSchemas', dependentSchemas);
  }

  get prefixItems(): ArrayElement | undefined {
    return this.get('prefixItems');
  }

  set prefixItems(prefixItems: ArrayElement | undefined) {
    this.set('prefixItems', prefixItems);
  }

  get items(): Schema | undefined {
    return this.get('items');
  }

  set items(items: Schema | undefined) {
    this.set('items', items);
  }

  get containsProp(): Schema | undefined {
    return this.get('contains');
  }

  set containsProp(containsProp: Schema | undefined) {
    this.set('contains', containsProp);
  }

  get properties(): ObjectElement | undefined {
    return this.get('properties');
  }

  set properties(properties: ObjectElement | undefined) {
    this.set('properties', properties);
  }

  get patternProperties(): ObjectElement | undefined {
    return this.get('patternProperties');
  }

  set patternProperties(patternProperties: ObjectElement | undefined) {
    this.set('patternProperties', patternProperties);
  }

  get additionalProperties(): Schema | undefined {
    return this.get('additionalProperties');
  }

  set additionalProperties(additionalProperties: Schema | undefined) {
    this.set('additionalProperties', additionalProperties);
  }

  get propertyNames(): Schema | undefined {
    return this.get('propertyNames');
  }

  set propertyNames(propertyNames: Schema | undefined) {
    this.set('propertyNames', propertyNames);
  }

  /**
   * Unevaluated Locations vocabulary
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/unevaluated
   */

  get unevaluatedItems(): Schema | undefined {
    return this.get('unevaluatedItems');
  }

  set unevaluatedItems(unevaluatedItems: Schema | undefined) {
    this.set('unevaluatedItems', unevaluatedItems);
  }

  get unevaluatedProperties(): Schema | undefined {
    return this.get('unevaluatedProperties');
  }

  set unevaluatedProperties(unevaluatedProperties: Schema | undefined) {
    this.set('unevaluatedProperties', unevaluatedProperties);
  }

  /**
   * Validation vocabulary
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/validation
   */

  /**
   *  Validation Keywords for Any Instance Type
   *
   *  URI: https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.1
   */

  get type(): ArrayElement | StringElement | undefined {
    return this.get('type');
  }

  set type(type: ArrayElement | StringElement | undefined) {
    this.set('type', type);
  }

  get enum(): ArrayElement | undefined {
    return this.get('enum');
  }

  set enum(enumVal: ArrayElement | undefined) {
    this.set('enum', enumVal);
  }

  get const(): Element | undefined {
    return this.get('const');
  }

  set const(constVal: Element | undefined) {
    this.set('const', constVal);
  }

  /**
   * Validation Keywords for Numeric Instances (number and integer)
   *
   * URI: https://json-schema.org/draft/2020-12/json-schema-validation.html#numeric
   */

  get multipleOf(): NumberElement | undefined {
    return this.get('multipleOf');
  }

  set multipleOf(multipleOf: NumberElement | undefined) {
    this.set('multipleOf', multipleOf);
  }

  get maximum(): NumberElement | undefined {
    return this.get('maximum');
  }

  set maximum(maximum: NumberElement | undefined) {
    this.set('maximum', maximum);
  }

  get exclusiveMaximum(): NumberElement | undefined {
    return this.get('exclusiveMaximum');
  }

  set exclusiveMaximum(exclusiveMaximum: NumberElement | undefined) {
    this.set('exclusiveMaximum', exclusiveMaximum);
  }

  get minimum(): NumberElement | undefined {
    return this.get('minimum');
  }

  set minimum(minimum: NumberElement | undefined) {
    this.set('minimum', minimum);
  }

  get exclusiveMinimum(): NumberElement | undefined {
    return this.get('exclusiveMinimum');
  }

  set exclusiveMinimum(exclusiveMinimum: NumberElement | undefined) {
    this.set('exclusiveMinimum', exclusiveMinimum);
  }

  /**
   * Validation Keywords for Strings
   *
   * URI: https://json-schema.org/draft/2020-12/json-schema-validation.html#string
   */

  get maxLength(): NumberElement | undefined {
    return this.get('maxLength');
  }

  set maxLength(maxLength: NumberElement | undefined) {
    this.set('maxLength', maxLength);
  }

  get minLength(): NumberElement | undefined {
    return this.get('minLength');
  }

  set minLength(minLength: NumberElement | undefined) {
    this.set('minLength', minLength);
  }

  get pattern(): StringElement | undefined {
    return this.get('pattern');
  }

  set pattern(pattern: StringElement | undefined) {
    this.set('pattern', pattern);
  }

  /**
   * Validation Keywords for Arrays
   *
   * URI: https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.4
   */

  get maxItems(): NumberElement | undefined {
    return this.get('maxItems');
  }

  set maxItems(maxItems: NumberElement | undefined) {
    this.set('maxItems', maxItems);
  }

  get minItems(): NumberElement | undefined {
    return this.get('minItems');
  }

  set minItems(minItems: NumberElement | undefined) {
    this.set('minItems', minItems);
  }

  get uniqueItems(): BooleanElement | undefined {
    return this.get('uniqueItems');
  }

  set uniqueItems(uniqueItems: BooleanElement | undefined) {
    this.set('uniqueItems', uniqueItems);
  }

  get maxContains(): NumberElement | undefined {
    return this.get('maxContains');
  }

  set maxContains(maxContains: NumberElement | undefined) {
    this.set('maxContains', maxContains);
  }

  get minContains(): NumberElement | undefined {
    return this.get('minContains');
  }

  set minContains(minContains: NumberElement | undefined) {
    this.set('minContains', minContains);
  }

  /**
   * Validation Keywords for Objects
   *
   * URI: https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.5
   */

  get maxProperties(): NumberElement | undefined {
    return this.get('maxProperties');
  }

  set maxProperties(maxProperties: NumberElement | undefined) {
    this.set('maxProperties', maxProperties);
  }

  get minProperties(): NumberElement | undefined {
    return this.get('minProperties');
  }

  set minProperties(minProperties: NumberElement | undefined) {
    this.set('minProperties', minProperties);
  }

  get required(): ArrayElement | undefined {
    return this.get('required');
  }

  set required(required: ArrayElement | undefined) {
    this.set('required', required);
  }

  get dependentRequired(): ObjectElement | undefined {
    return this.get('dependentRequired');
  }

  set dependentRequired(dependentRequired: ObjectElement | undefined) {
    this.set('dependentRequired', dependentRequired);
  }

  /**
   * Vocabulary for Basic Meta-Data Annotations
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/meta-data
   */

  get title(): StringElement | undefined {
    return this.get('title');
  }

  set title(title: StringElement | undefined) {
    this.set('title', title);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get default(): Element | undefined {
    return this.get('default');
  }

  set default(defaultVal: Element | undefined) {
    this.set('default', defaultVal);
  }

  get deprecated(): BooleanElement | undefined {
    return this.get('deprecated');
  }

  set deprecated(deprecated: BooleanElement | undefined) {
    this.set('deprecated', deprecated);
  }

  get readOnly(): BooleanElement | undefined {
    return this.get('readOnly');
  }

  set readOnly(readOnly: BooleanElement | undefined) {
    this.set('readOnly', readOnly);
  }

  get writeOnly(): BooleanElement | undefined {
    return this.get('writeOnly');
  }

  set writeOnly(writeOnly: BooleanElement | undefined) {
    this.set('writeOnly', writeOnly);
  }

  get examples(): ArrayElement | undefined {
    return this.get('examples');
  }

  set examples(examples: ArrayElement | undefined) {
    this.set('examples', examples);
  }

  /**
   * Vocabularies for Semantic Content With "format"
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/format-annotation
   */

  get format(): StringElement | undefined {
    return this.get('format');
  }

  set format(format: StringElement | undefined) {
    this.set('format', format);
  }

  /**
   * Vocabulary for the Contents of String-Encoded Data
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/content
   */

  get contentEncoding(): StringElement | undefined {
    return this.get('contentEncoding');
  }

  set contentEncoding(contentEncoding: StringElement | undefined) {
    this.set('contentEncoding', contentEncoding);
  }

  get contentMediaType(): StringElement | undefined {
    return this.get('contentMediaType');
  }

  set contentMediaType(contentMediaType: StringElement | undefined) {
    this.set('contentMediaType', contentMediaType);
  }

  get contentSchema(): Schema | undefined {
    return this.get('contentSchema');
  }

  set contentSchema(contentSchema: Schema | undefined) {
    this.set('contentSchema', contentSchema);
  }

  /**
   * OAS base vocabulary
   *
   * URI: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#baseVocabulary
   */

  get discriminator(): DiscriminatorElement | undefined {
    return this.get('discriminator');
  }

  set discriminator(discriminator: DiscriminatorElement | undefined) {
    this.set('discriminator', discriminator);
  }

  get xml(): XmlElement | undefined {
    return this.get('xml');
  }

  set xml(xml: XmlElement | undefined) {
    this.set('xml', xml);
  }

  get externalDocs(): ExternalDocumentationElement | undefined {
    return this.get('externalDocs');
  }

  set externalDocs(externalDocs: ExternalDocumentationElement | undefined) {
    this.set('externalDocs', externalDocs);
  }

  /**
   * @deprecated The example property has been deprecated in favor of the JSON Schema examples keyword. Use of example is discouraged, and later versions of this specification may remove it.
   */
  get example(): Element | undefined {
    return this.get('example');
  }

  /**
   * @deprecated The example property has been deprecated in favor of the JSON Schema examples keyword. Use of example is discouraged, and later versions of this specification may remove it.
   */
  set example(example: Element | undefined) {
    this.set('example', example);
  }
}

export default Schema;
