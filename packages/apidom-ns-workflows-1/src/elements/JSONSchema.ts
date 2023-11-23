import type { Attributes, Meta } from '@swagger-api/apidom-core';
import { SchemaElement } from '@swagger-api/apidom-ns-openapi-3-1';

class JSONSchema extends SchemaElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'jSONSchemaDraft202012';
  }

  /**
   * We're redefining the getters/setters here so that the following keywords
   * are not part of the OAS base vocabulary, but rather an arbitrary custom dialect.
   */
  get discriminator(): any {
    return this.get('discriminator');
  }

  set discriminator(discriminator: any) {
    this.set('discriminator', discriminator);
  }

  get xml(): any {
    return this.get('xml');
  }

  set xml(xml: any) {
    this.set('xml', xml);
  }

  get externalDocs(): any {
    return this.get('externalDocs');
  }

  set externalDocs(externalDocs: any) {
    this.set('externalDocs', externalDocs);
  }

  get example(): any {
    return this.get('example');
  }

  set example(example: any) {
    this.set('example', example);
  }
}

export default JSONSchema;
