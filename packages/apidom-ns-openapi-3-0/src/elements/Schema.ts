import { StringElement, BooleanElement, Element, Attributes, Meta } from '@swagger-api/apidom-core';
import { JSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-draft-4';

import ReferenceElement from './Reference';
import DiscriminatorElement from './Discriminator';
import XmlElement from './Xml';
import ExternalDocumentationElement from './ExternalDocumentation';

class Schema extends JSONSchemaElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'schema';
    this.classes.push('json-schema-draft-4');
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

export default Schema;
