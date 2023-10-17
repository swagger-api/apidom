import {
  StringElement,
  BooleanElement,
  Attributes,
  Meta,
  NumberElement,
  ArrayElement,
  ObjectElement,
} from '@swagger-api/apidom-core';
import { UnsupportedOperationError } from '@swagger-api/apidom-error';
import {
  JSONReferenceElement,
  JSONSchemaElement,
  MediaElement,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

/* eslint-disable class-methods-use-this */
class Items extends JSONSchemaElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'items';
    this.classes.push('json-schema-draft-4');
  }

  /**
   * Core vocabulary
   *
   * URI: https://tools.ietf.org/html/draft-wright-json-schema-00
   */
  get idProp(): StringElement | undefined {
    throw new UnsupportedOperationError('idProp getter in Items class is not not supported.');
  }

  set idProp(idProps: StringElement | undefined) {
    throw new UnsupportedOperationError('idProp setter in Items class is not not supported.');
  }

  get $schema(): StringElement | undefined {
    throw new UnsupportedOperationError('$schema getter in Items class is not not supported.');
  }

  set $schema($schema: StringElement | undefined) {
    throw new UnsupportedOperationError('$schema setter in Items class is not not supported.');
  }

  /**
   * Validation keywords for arrays
   */

  get additionalItems(): this | JSONReferenceElement | BooleanElement | undefined {
    throw new UnsupportedOperationError(
      'additionalItems getter in Items class is not not supported.',
    );
  }

  set additionalItems(additionalItems: this | JSONReferenceElement | BooleanElement | undefined) {
    throw new UnsupportedOperationError(
      'additionalItems setter in Items class is not not supported.',
    );
  }

  get items(): this | undefined {
    return this.get('items');
  }

  set items(items: this | undefined) {
    this.set('items', items);
  }

  /**
   * Validation keywords for objects
   */

  get maxProperties(): NumberElement | undefined {
    throw new UnsupportedOperationError(
      'maxProperties getter in Items class is not not supported.',
    );
  }

  set maxProperties(maxProperties: NumberElement | undefined) {
    throw new UnsupportedOperationError(
      'maxProperties setter in Items class is not not supported.',
    );
  }

  get minProperties(): NumberElement | undefined {
    throw new UnsupportedOperationError(
      'minProperties getter in Items class is not not supported.',
    );
  }

  set minProperties(minProperties: NumberElement | undefined) {
    throw new UnsupportedOperationError(
      'minProperties setter in Items class is not not supported.',
    );
  }

  get required(): ArrayElement | undefined {
    throw new UnsupportedOperationError('required getter in Items class is not not supported.');
  }

  set required(required: ArrayElement | undefined) {
    throw new UnsupportedOperationError('required setter in Items class is not not supported.');
  }

  get properties(): ObjectElement | undefined {
    throw new UnsupportedOperationError('properties getter in Items class is not not supported.');
  }

  set properties(properties: ObjectElement | undefined) {
    throw new UnsupportedOperationError('properties setter in Items class is not not supported.');
  }

  get additionalProperties(): this | JSONReferenceElement | BooleanElement | undefined {
    throw new UnsupportedOperationError(
      'additionalProperties getter in Items class is not not supported.',
    );
  }

  set additionalProperties(
    additionalProperties: this | JSONReferenceElement | BooleanElement | undefined,
  ) {
    throw new UnsupportedOperationError(
      'additionalProperties setter in Items class is not not supported.',
    );
  }

  get patternProperties(): ObjectElement | undefined {
    throw new UnsupportedOperationError(
      'patternProperties getter in Items class is not not supported.',
    );
  }

  set patternProperties(patternProperties: ObjectElement | undefined) {
    throw new UnsupportedOperationError(
      'patternProperties setter in Items class is not not supported.',
    );
  }

  get dependencies(): ObjectElement | undefined {
    throw new UnsupportedOperationError('dependencies getter in Items class is not not supported.');
  }

  set dependencies(dependencies: ObjectElement | undefined) {
    throw new UnsupportedOperationError('dependencies setter in Items class is not not supported.');
  }

  /**
   *  Validation keywords for any instance type
   */

  get type(): StringElement | undefined {
    return this.get('type');
  }

  set type(type: StringElement | undefined) {
    this.set('type', type);
  }

  get allOf(): ArrayElement | undefined {
    throw new UnsupportedOperationError('allOf getter in Items class is not not supported.');
  }

  set allOf(allOf: ArrayElement | undefined) {
    throw new UnsupportedOperationError('allOf setter in Items class is not not supported.');
  }

  get anyOf(): ArrayElement | undefined {
    throw new UnsupportedOperationError('anyOf getter in Items class is not not supported.');
  }

  set anyOf(anyOf: ArrayElement | undefined) {
    throw new UnsupportedOperationError('anyOf setter in Items class is not not supported.');
  }

  get oneOf(): ArrayElement | undefined {
    throw new UnsupportedOperationError('oneOf getter in Items class is not not supported.');
  }

  set oneOf(oneOf: ArrayElement | undefined) {
    throw new UnsupportedOperationError('oneOf setter in Items class is not not supported.');
  }

  get not(): this | JSONReferenceElement | undefined {
    throw new UnsupportedOperationError('not getter in Items class is not not supported.');
  }

  set not(not: this | JSONReferenceElement | undefined) {
    throw new UnsupportedOperationError('not setter in Items class is not not supported.');
  }

  get definitions(): ObjectElement | undefined {
    throw new UnsupportedOperationError('definitions getter in Items class is not not supported.');
  }

  set definitions(definitions: ObjectElement | undefined) {
    throw new UnsupportedOperationError('definitions setter in Items class is not not supported.');
  }

  /**
   * Metadata keywords
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-wright-json-schema-validation-00#section-6
   */

  get title(): StringElement | undefined {
    throw new UnsupportedOperationError('title getter in Items class is not not supported.');
  }

  set title(title: StringElement | undefined) {
    throw new UnsupportedOperationError('title setter in Items class is not not supported.');
  }

  get description(): StringElement | undefined {
    throw new UnsupportedOperationError('description getter in Items class is not not supported.');
  }

  set description(description: StringElement | undefined) {
    throw new UnsupportedOperationError('description setter in Items class is not not supported.');
  }

  /**
   * JSON Hyper-Schema
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-wright-json-schema-hyperschema-00
   */

  get base(): StringElement | undefined {
    throw new UnsupportedOperationError('base getter in Items class is not not supported.');
  }

  set base(base: StringElement | undefined) {
    throw new UnsupportedOperationError('base setter in Items class is not not supported.');
  }

  get links(): ArrayElement | undefined {
    throw new UnsupportedOperationError('links getter in Items class is not not supported.');
  }

  set links(links: ArrayElement | undefined) {
    throw new UnsupportedOperationError('links setter in Items class is not not supported.');
  }

  get media(): MediaElement | undefined {
    throw new UnsupportedOperationError('media getter in Items class is not not supported.');
  }

  set media(media: MediaElement | undefined) {
    throw new UnsupportedOperationError('media setter in Items class is not not supported.');
  }

  get readOnly(): BooleanElement | undefined {
    throw new UnsupportedOperationError('readOnly getter in Items class is not not supported.');
  }

  set readOnly(readOnly: BooleanElement | undefined) {
    throw new UnsupportedOperationError('readOnly setter in Items class is not not supported.');
  }
}
/* eslint-enable class-methods-use-this */

export default Items;
