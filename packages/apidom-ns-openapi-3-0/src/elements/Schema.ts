import { UnsupportedOperationError } from '@swagger-api/apidom-error';
import {
  StringElement,
  BooleanElement,
  Element,
  Attributes,
  Meta,
  ObjectElement,
  ArrayElement,
} from '@swagger-api/apidom-core';
import { JSONSchemaElement, MediaElement } from '@swagger-api/apidom-ns-json-schema-draft-4';

import ReferenceElement from './Reference';
import DiscriminatorElement from './Discriminator';
import XmlElement from './Xml';
import ExternalDocumentationElement from './ExternalDocumentation';

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

  get additionalItems(): this | ReferenceElement | BooleanElement | undefined {
    return this.get('additionalItems');
  }

  set additionalItems(additionalItems: this | ReferenceElement | BooleanElement | undefined) {
    this.set('additionalItems', additionalItems);
  }

  get items(): this | ReferenceElement | undefined {
    return this.get('items');
  }

  set items(items: this | ReferenceElement | undefined) {
    this.set('items', items);
  }

  /**
   * Validation keywords for objects
   */

  get additionalProperties(): this | ReferenceElement | BooleanElement | undefined {
    return this.get('additionalProperties');
  }

  set additionalProperties(
    additionalProperties: this | ReferenceElement | BooleanElement | undefined,
  ) {
    this.set('additionalProperties', additionalProperties);
  }

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

  get type(): StringElement | undefined {
    return this.get('type');
  }

  set type(type: StringElement | undefined) {
    this.set('type', type);
  }

  get not(): this | ReferenceElement | undefined {
    return this.get('not');
  }

  set not(not: this | ReferenceElement | undefined) {
    this.set('not', not);
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

  /**
   * OpenAPI vocabulary
   */

  get nullable(): BooleanElement | undefined {
    return this.get('nullable');
  }

  set nullable(nullable: BooleanElement | undefined) {
    this.set('nullable', nullable);
  }

  get discriminator(): DiscriminatorElement | undefined {
    return this.get('discriminator');
  }

  set discriminator(discriminator: DiscriminatorElement | undefined) {
    this.set('discriminator', discriminator);
  }

  get writeOnly(): BooleanElement | undefined {
    return this.get('writeOnly');
  }

  set writeOnly(writeOnly: BooleanElement | undefined) {
    this.set('writeOnly', writeOnly);
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

  get example(): Element | undefined {
    return this.get('example');
  }

  set example(example: Element | undefined) {
    this.set('example', example);
  }

  get deprecated(): BooleanElement | undefined {
    return this.get('deprecated');
  }

  set deprecated(deprecated: BooleanElement | undefined) {
    this.set('deprecated', deprecated);
  }
}
/* eslint-disable class-methods-use-this */

export default Schema;
