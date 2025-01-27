import { Element, Attributes, Meta } from '@swagger-api/apidom-core';
import { JSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-2020-12';

import XmlElement from './Xml.ts';
import DiscriminatorElement from './Discriminator.ts';
import ExternalDocumentationElement from './ExternalDocumentation.ts';

/**
 * @public
 */
class Schema extends JSONSchemaElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'schema';
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

  set example(example: Element | undefined) {
    this.set('example', example);
  }
}

export default Schema;
