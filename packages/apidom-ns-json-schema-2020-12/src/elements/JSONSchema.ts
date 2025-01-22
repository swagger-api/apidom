import {
  StringElement,
  ArrayElement,
  BooleanElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';
import { UnsupportedOperationError } from '@swagger-api/apidom-error';
import { JSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-2019-09';

/* eslint-disable class-methods-use-this */

/**
 * @public
 */
class JSONSchema extends JSONSchemaElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'JSONSchema202012';
  }

  /**
   * Core vocabulary
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/core
   */

  get $dynamicAnchor(): StringElement | undefined {
    return this.get('$dynamicAnchor');
  }

  set $dynamicAnchor($dynamicAnchor: StringElement | undefined) {
    this.set('$dynamicAnchor', $dynamicAnchor);
  }

  get $recursiveAnchor(): BooleanElement | undefined {
    throw new UnsupportedOperationError(
      '$recursiveAnchor keyword from Core vocabulary has been renamed to $dynamicAnchor.',
    );
  }

  set $recursiveAnchor($recursiveAnchor: BooleanElement | undefined) {
    throw new UnsupportedOperationError(
      '$recursiveAnchor keyword from Core vocabulary has been renamed to $dynamicAnchor.',
    );
  }

  get $dynamicRef(): StringElement | undefined {
    return this.get('$dynamicRef');
  }

  set $dynamicRef($dynamicRef: StringElement | undefined) {
    this.set('$dynamicRef', $dynamicRef);
  }

  get $recursiveRef(): StringElement | undefined {
    throw new UnsupportedOperationError(
      '$recursiveRef keyword from Core vocabulary has been renamed to $dynamicRef.',
    );
  }

  set $recursiveRef($recursiveRef: StringElement | undefined) {
    throw new UnsupportedOperationError(
      '$recursiveRef keyword from Core vocabulary has been renamed to $dynamicRef.',
    );
  }

  /**
   * Applicator vocabulary
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/applicator
   */

  get not(): this | BooleanElement | undefined {
    return this.get('not');
  }

  set not(not: this | BooleanElement | undefined) {
    this.set('not', not);
  }

  get if(): this | BooleanElement | undefined {
    return this.get('if');
  }

  set if(ifSchema: this | BooleanElement | undefined) {
    this.set('if', ifSchema);
  }

  get then(): this | BooleanElement | undefined {
    return this.get('then');
  }

  set then(thenSchema: this | BooleanElement | undefined) {
    this.set('then', thenSchema);
  }

  get else(): this | BooleanElement | undefined {
    return this.get('else');
  }

  set else(elseSchema: this | BooleanElement | undefined) {
    this.set('else', elseSchema);
  }

  get prefixItems(): ArrayElement | undefined {
    return this.get('prefixItems');
  }

  set prefixItems(prefixItems: ArrayElement | undefined) {
    this.set('prefixItems', prefixItems);
  }

  get items(): this | BooleanElement | undefined {
    return this.get('items');
  }

  set items(items: this | BooleanElement | undefined) {
    this.set('items', items);
  }

  get containsProp(): this | BooleanElement | undefined {
    return this.get('contains');
  }

  set containsProp(containsProp: this | BooleanElement | undefined) {
    this.set('contains', containsProp);
  }

  get additionalProperties(): this | BooleanElement | undefined {
    return this.get('additionalProperties');
  }

  set additionalProperties(additionalProperties: this | BooleanElement | undefined) {
    this.set('additionalProperties', additionalProperties);
  }

  get additionalItems(): this | BooleanElement | undefined {
    throw new UnsupportedOperationError(
      'additionalItems keyword from Applicator vocabulary has been removed.',
    );
  }

  set additionalItems(additionalItems: this | BooleanElement | undefined) {
    throw new UnsupportedOperationError(
      'additionalItems keyword from Applicator vocabulary has been removed.',
    );
  }

  get propertyNames(): this | BooleanElement | undefined {
    return this.get('propertyNames');
  }

  set propertyNames(propertyNames: this | BooleanElement | undefined) {
    this.set('propertyNames', propertyNames);
  }

  /**
   * Unevaluated Locations vocabulary
   *
   * URI: https://json-schema.org/draft/2020-12/json-schema-core#section-11
   */

  get unevaluatedItems(): this | BooleanElement | undefined {
    return this.get('unevaluatedItems');
  }

  set unevaluatedItems(unevaluatedItems: this | BooleanElement | undefined) {
    this.set('unevaluatedItems', unevaluatedItems);
  }

  get unevaluatedProperties(): this | BooleanElement | undefined {
    return this.get('unevaluatedProperties');
  }

  set unevaluatedProperties(unevaluatedProperties: this | BooleanElement | undefined) {
    this.set('unevaluatedProperties', unevaluatedProperties);
  }

  /**
   * Vocabulary for the Contents of String-Encoded Data
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/content
   */

  get contentSchema(): this | BooleanElement | undefined {
    return this.get('contentSchema');
  }

  set contentSchema(contentSchema: this | BooleanElement | undefined) {
    this.set('contentSchema', contentSchema);
  }
}

export default JSONSchema;
