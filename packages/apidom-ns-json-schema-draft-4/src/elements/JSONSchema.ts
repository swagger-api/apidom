import {
  Element,
  ArrayElement,
  NumberElement,
  ObjectElement,
  StringElement,
  BooleanElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import JSONReferenceElement from './JSONReference';
import MediaElement from './Media';

class JSONSchema extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'JSONSchemaDraft4';
  }

  /**
   * Core vocabulary
   *
   * URI: https://tools.ietf.org/html/draft-wright-json-schema-00
   */

  get idProp(): StringElement | undefined {
    return this.get('id');
  }

  set idProp(idProp: StringElement | undefined) {
    this.set('id', idProp);
  }

  get $schema(): StringElement | undefined {
    return this.get('$schema');
  }

  set $schema($schema: StringElement | undefined) {
    this.set('$schema', $schema);
  }

  /**
   * Validation vocabulary
   *
   * URI: https://tools.ietf.org/html/draft-wright-json-schema-validation-00
   */

  /**
   *  Validation keywords for numeric instances (number and integer)
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

  get exclusiveMaximum(): BooleanElement | undefined {
    return this.get('exclusiveMaximum');
  }

  set exclusiveMaximum(exclusiveMaximum: BooleanElement | undefined) {
    this.set('exclusiveMaximum', exclusiveMaximum);
  }

  get minimum(): NumberElement | undefined {
    return this.get('minimum');
  }

  set minimum(minimum: NumberElement | undefined) {
    this.set('minimum', minimum);
  }

  get exclusiveMinimum(): BooleanElement | undefined {
    return this.get('exclusiveMinimum');
  }

  set exclusiveMinimum(exclusiveMinimum: BooleanElement | undefined) {
    this.set('exclusiveMinimum', exclusiveMinimum);
  }

  /**
   * Validation keywords for strings
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
   * Validation keywords for arrays
   */

  get additionalItems(): this | JSONReferenceElement | BooleanElement | undefined {
    return this.get('additionalItems');
  }

  set additionalItems(additionalItems: this | JSONReferenceElement | BooleanElement | undefined) {
    this.set('additionalItems', additionalItems);
  }

  get items(): this | JSONReferenceElement | ArrayElement | undefined {
    return this.get('items');
  }

  set items(items: this | JSONReferenceElement | ArrayElement | undefined) {
    this.set('items', items);
  }

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

  /**
   * Validation keywords for objects
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

  get properties(): ObjectElement | undefined {
    return this.get('properties');
  }

  set properties(properties: ObjectElement | undefined) {
    this.set('properties', properties);
  }

  get additionalProperties(): this | JSONReferenceElement | BooleanElement | undefined {
    return this.get('additionalProperties');
  }

  set additionalProperties(
    additionalProperties: this | JSONReferenceElement | BooleanElement | undefined,
  ) {
    this.set('additionalProperties', additionalProperties);
  }

  get patternProperties(): ObjectElement | undefined {
    return this.get('patternProperties');
  }

  set patternProperties(patternProperties: ObjectElement | undefined) {
    this.set('patternProperties', patternProperties);
  }

  get dependencies(): ObjectElement | undefined {
    return this.get('dependencies');
  }

  set dependencies(dependencies: ObjectElement | undefined) {
    this.set('dependencies', dependencies);
  }

  /**
   *  Validation keywords for any instance type
   */

  get enum(): ArrayElement | undefined {
    return this.get('enum');
  }

  set enum(enumValue: ArrayElement | undefined) {
    this.set('enum', enumValue);
  }

  get type(): ArrayElement | StringElement | undefined {
    return this.get('type');
  }

  set type(type: ArrayElement | StringElement | undefined) {
    this.set('type', type);
  }

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

  get not(): this | JSONReferenceElement | undefined {
    return this.get('not');
  }

  set not(not: this | JSONReferenceElement | undefined) {
    this.set('not', not);
  }

  get definitions(): ObjectElement | undefined {
    return this.get('definitions');
  }

  set definitions(definitions: ObjectElement | undefined) {
    this.set('definitions', definitions);
  }

  /**
   * Metadata keywords
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-wright-json-schema-validation-00#section-6
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

  set default(defaultValue: Element | undefined) {
    this.set('default', defaultValue);
  }

  /**
   * Semantic validation with "format"
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-wright-json-schema-validation-00#section-7
   */

  get format(): StringElement | undefined {
    return this.get('format');
  }

  set format(format: StringElement | undefined) {
    this.set('format', format);
  }

  /**
   * JSON Hyper-Schema
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-wright-json-schema-hyperschema-00
   */

  get base(): StringElement | undefined {
    return this.get('base');
  }

  set base(base: StringElement | undefined) {
    this.set('base', base);
  }

  get links(): ArrayElement | undefined {
    return this.get('links');
  }

  set links(links: ArrayElement | undefined) {
    this.set('links', links);
  }

  get media(): MediaElement | undefined {
    return this.get('media');
  }

  set media(media: MediaElement | undefined) {
    this.set('media', media);
  }

  get readOnly(): BooleanElement | undefined {
    return this.get('readOnly');
  }

  set readOnly(readOnly: BooleanElement | undefined) {
    this.set('readOnly', readOnly);
  }
}

export default JSONSchema;
