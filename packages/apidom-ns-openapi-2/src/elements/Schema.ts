import {
  Attributes,
  Meta,
  ArrayElement,
  BooleanElement,
  ObjectElement,
  StringElement,
} from '@swagger-api/apidom-core';
import { UnsupportedOperationError } from '@swagger-api/apidom-error';
import {
  JSONReferenceElement,
  JSONSchemaElement,
  MediaElement,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

/* eslint-disable class-methods-use-this */
class Schema extends JSONSchemaElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'schema';
    this.classes.push('json-schema-draft-4');
  }

  /**
   * Core vocabulary
   *
   * URI: https://tools.ietf.org/html/draft-wright-json-schema-00
   */
  get idProp(): StringElement | undefined {
    throw new UnsupportedOperationError('idProp getter in Schema class is not not supported.');
  }

  set idProp(idProps: StringElement | undefined) {
    throw new UnsupportedOperationError('idProp setter in Schema class is not not supported.');
  }

  get $schema(): StringElement | undefined {
    throw new UnsupportedOperationError('$schema getter in Schema class is not not supported.');
  }

  set $schema($schema: StringElement | undefined) {
    throw new UnsupportedOperationError('$schema setter in Schema class is not not supported.');
  }

  /**
   * Validation keywords for arrays
   */

  get additionalItems(): this | JSONReferenceElement | BooleanElement | undefined {
    throw new UnsupportedOperationError(
      'additionalItems getter in Schema class is not not supported.',
    );
  }

  set additionalItems(additionalItems: this | JSONReferenceElement | BooleanElement | undefined) {
    throw new UnsupportedOperationError(
      'additionalItems setter in Schema class is not not supported.',
    );
  }

  /**
   * Validation keywords for objects
   */

  get patternProperties(): ObjectElement | undefined {
    throw new UnsupportedOperationError(
      'patternProperties getter in Schema class is not not supported.',
    );
  }

  set patternProperties(patternProperties: ObjectElement | undefined) {
    throw new UnsupportedOperationError(
      'patternProperties setter in Schema class is not not supported.',
    );
  }

  get dependencies(): ObjectElement | undefined {
    throw new UnsupportedOperationError(
      'dependencies getter in Schema class is not not supported.',
    );
  }

  set dependencies(dependencies: ObjectElement | undefined) {
    throw new UnsupportedOperationError(
      'dependencies setter in Schema class is not not supported.',
    );
  }

  /**
   *  Validation keywords for any instance type
   */
  get anyOf(): ArrayElement | undefined {
    throw new UnsupportedOperationError('anyOf getter in Schema class is not not supported.');
  }

  set anyOf(anyOf: ArrayElement | undefined) {
    throw new UnsupportedOperationError('anyOf setter in Schema class is not not supported.');
  }

  get oneOf(): ArrayElement | undefined {
    throw new UnsupportedOperationError('oneOf getter in Schema class is not not supported.');
  }

  set oneOf(oneOf: ArrayElement | undefined) {
    throw new UnsupportedOperationError('oneOf setter in Schema class is not not supported.');
  }

  get not(): this | JSONReferenceElement | undefined {
    throw new UnsupportedOperationError('not getter in Schema class is not not supported.');
  }

  set not(not: this | JSONReferenceElement | undefined) {
    throw new UnsupportedOperationError('not setter in Schema class is not not supported.');
  }

  get definitions(): ObjectElement | undefined {
    throw new UnsupportedOperationError('definitions getter in Schema class is not not supported.');
  }

  set definitions(definitions: ObjectElement | undefined) {
    throw new UnsupportedOperationError('definitions setter in Schema class is not not supported.');
  }

  /**
   * JSON Hyper-Schema
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-wright-json-schema-hyperschema-00
   */

  get base(): StringElement | undefined {
    throw new UnsupportedOperationError('base getter in Schema class is not not supported.');
  }

  set base(base: StringElement | undefined) {
    throw new UnsupportedOperationError('base setter in Schema class is not not supported.');
  }

  get links(): ArrayElement | undefined {
    throw new UnsupportedOperationError('links getter in Schema class is not not supported.');
  }

  set links(links: ArrayElement | undefined) {
    throw new UnsupportedOperationError('links setter in Schema class is not not supported.');
  }

  get media(): MediaElement | undefined {
    throw new UnsupportedOperationError('media getter in Schema class is not not supported.');
  }

  set media(media: MediaElement | undefined) {
    throw new UnsupportedOperationError('media setter in Schema class is not not supported.');
  }
}
/* eslint-enable class-methods-use-this */

export default Schema;
