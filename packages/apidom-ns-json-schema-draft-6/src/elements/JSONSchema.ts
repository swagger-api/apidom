import {
  Element,
  StringElement,
  NumberElement,
  BooleanElement,
  ArrayElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';
import { UnsupportedOperationError } from '@swagger-api/apidom-error';
import {
  JSONSchemaElement,
  JSONReferenceElement,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

/* eslint-disable class-methods-use-this */

class JSONSchema extends JSONSchemaElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'JSONSchemaDraft6';
  }

  /**
   * Core vocabulary
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-wright-json-schema-01
   */

  get idProp(): StringElement | undefined {
    throw new UnsupportedOperationError('id keyword from Core vocabulary has been renamed to $id.');
  }

  set idProp(id: StringElement | undefined) {
    throw new UnsupportedOperationError('id keyword from Core vocabulary has been renamed to $id.');
  }

  get $id(): StringElement | undefined {
    return this.get('$id');
  }

  set $id($id: StringElement | undefined) {
    this.set('$id', $id);
  }

  /**
   * Validation vocabulary
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-wright-json-schema-validation-01
   */

  /**
   *  Validation keywords for numeric instances (number and integer)
   */

  get exclusiveMaximum(): NumberElement | undefined {
    return this.get('exclusiveMaximum');
  }

  set exclusiveMaximum(exclusiveMaximum: NumberElement | undefined) {
    this.set('exclusiveMaximum', exclusiveMaximum);
  }

  get exclusiveMinimum(): NumberElement | undefined {
    return this.get('exclusiveMinimum');
  }

  set exclusiveMinimum(exclusiveMinimum: NumberElement | undefined) {
    this.set('exclusiveMinimum', exclusiveMinimum);
  }

  /**
   * Validation keywords for arrays
   */

  get containsProp(): this | BooleanElement | JSONReferenceElement | undefined {
    return this.get('contains');
  }

  set containsProp(contains: this | BooleanElement | JSONReferenceElement | undefined) {
    this.set('contains', contains);
  }

  get items(): this | BooleanElement | JSONReferenceElement | ArrayElement | undefined | any {
    return this.get('items');
  }

  set items(items: this | BooleanElement | JSONReferenceElement | ArrayElement | undefined | any) {
    this.set('items', items);
  }

  /**
   * Validation keywords for objects
   */

  get propertyNames(): this | BooleanElement | JSONReferenceElement | undefined {
    return this.get('propertyNames');
  }

  set propertyNames(propertyNames: this | BooleanElement | JSONReferenceElement | undefined) {
    this.set('propertyNames', propertyNames);
  }

  /**
   *  Validation keywords for any instance type
   */

  get const(): Element | undefined {
    return this.get('const');
  }

  set const(constValue: Element | undefined) {
    this.set('const', constValue);
  }

  get not(): this | BooleanElement | JSONReferenceElement | undefined | any {
    return this.get('not');
  }

  set not(not: this | BooleanElement | JSONReferenceElement | undefined | any) {
    this.set('not', not);
  }

  /**
   * Metadata keywords
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-wright-json-schema-validation-01#section-7
   */

  get examples(): ArrayElement | undefined {
    return this.get('examples');
  }

  set examples(examples: ArrayElement | undefined) {
    this.set('examples', examples);
  }
}

export default JSONSchema;
