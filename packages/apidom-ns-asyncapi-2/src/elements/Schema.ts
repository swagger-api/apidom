import {
  ArrayElement,
  StringElement,
  BooleanElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';
import { JSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-draft-7';

import ReferenceElement from './Reference.ts';
import ExternalDocumentationElement from './ExternalDocumentation.ts';

/**
 * @public
 */
class Schema extends JSONSchemaElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'schema';
    this.classes.push('json-schema-draft-7');
  }

  /**
   * Validation vocabulary
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01
   */

  /**
   *  Validation Keywords for Applying Subschemas With Boolean Logic
   *
   *  URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-6.7
   */

  get not(): this | BooleanElement | ReferenceElement | undefined | any {
    return this.get('not');
  }

  /**
   *  Validation Keywords for Applying Subschemas Conditionally
   *
   *  URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-6.6
   */

  get if(): this | BooleanElement | ReferenceElement | undefined {
    return this.get('if');
  }

  set if(ifValue: this | BooleanElement | ReferenceElement | undefined) {
    this.set('if', ifValue);
  }

  get then(): this | BooleanElement | ReferenceElement | undefined {
    return this.get('then');
  }

  set then(then: this | BooleanElement | ReferenceElement | undefined) {
    this.set('then', then);
  }

  get else(): this | BooleanElement | ReferenceElement | undefined {
    return this.get('else');
  }

  set else(elseValue: this | BooleanElement | ReferenceElement | undefined) {
    this.set('else', elseValue);
  }

  /**
   * Validation Keywords for Arrays
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-6.4
   */

  get items(): this | BooleanElement | ReferenceElement | ArrayElement | undefined | any {
    return this.get('items');
  }

  set items(items: this | BooleanElement | ReferenceElement | ArrayElement | undefined | any) {
    this.set('items', items);
  }

  get additionalItems(): this | BooleanElement | ReferenceElement | undefined {
    return this.get('additionalItems');
  }

  set additionalItems(additionalItems: this | BooleanElement | ReferenceElement | undefined) {
    this.set('additionalItems', additionalItems);
  }

  get containsProp(): this | BooleanElement | ReferenceElement | undefined {
    return this.get('contains');
  }

  set containsProp(contains: this | BooleanElement | ReferenceElement | undefined) {
    this.set('contains', contains);
  }

  /**
   * Validation Keywords for Objects
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-6.5
   */

  get propertyNames(): this | BooleanElement | ReferenceElement | undefined {
    return this.get('propertyNames');
  }

  set propertyNames(propertyNames: this | BooleanElement | ReferenceElement | undefined) {
    this.set('propertyNames', propertyNames);
  }

  /**
   * AsyncAPI vocabulary
   *
   * URI: https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#fixed-fields-21
   */

  get discriminator(): StringElement | undefined {
    return this.get('discriminator');
  }

  get externalDocs(): ExternalDocumentationElement | undefined {
    return this.get('externalDocs');
  }

  get deprecated(): BooleanElement | undefined {
    return this.get('deprecated');
  }
}

export default Schema;
