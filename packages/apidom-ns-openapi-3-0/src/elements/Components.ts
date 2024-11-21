import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Components extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'components';
  }

  get schemas(): ObjectElement | undefined {
    return this.get('schemas');
  }

  set schemas(schemas: ObjectElement | undefined) {
    this.set('schemas', schemas);
  }

  get responses(): ObjectElement | undefined {
    return this.get('responses');
  }

  set responses(responses: ObjectElement | undefined) {
    this.set('responses', responses);
  }

  get parameters(): ObjectElement | undefined {
    return this.get('parameters');
  }

  set parameters(parameters: ObjectElement | undefined) {
    this.set('parameters', parameters);
  }

  get examples(): ObjectElement | undefined {
    return this.get('examples');
  }

  set examples(examples: ObjectElement | undefined) {
    this.set('examples', examples);
  }

  get requestBodies(): ObjectElement | undefined {
    return this.get('requestBodies');
  }

  set requestBodies(requestBodies: ObjectElement | undefined) {
    this.set('requestBodies', requestBodies);
  }

  get headers(): ObjectElement | undefined {
    return this.get('headers');
  }

  set headers(headers: ObjectElement | undefined) {
    this.set('headers', headers);
  }

  get securitySchemes(): ObjectElement | undefined {
    return this.get('securitySchemes');
  }

  set securitySchemes(securitySchemes: ObjectElement | undefined) {
    this.set('securitySchemes', securitySchemes);
  }

  get links(): ObjectElement | undefined {
    return this.get('links');
  }

  set links(links: ObjectElement | undefined) {
    this.set('links', links);
  }

  get callbacks(): ObjectElement | undefined {
    return this.get('callbacks');
  }

  set callbacks(callbacks: ObjectElement | undefined) {
    this.set('callbacks', callbacks);
  }
}

export default Components;
