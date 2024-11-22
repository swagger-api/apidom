import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Response extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'response';
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get headers(): ObjectElement | undefined {
    return this.get('headers');
  }

  set headers(headers: ObjectElement | undefined) {
    this.set('headers', headers);
  }

  get contentProp(): ObjectElement | undefined {
    return this.get('content');
  }

  set contentProp(contentProp: ObjectElement | undefined) {
    this.set('content', contentProp);
  }

  get links(): ObjectElement | undefined {
    return this.get('links');
  }

  set links(links: ObjectElement | undefined) {
    this.set('links', links);
  }
}

export default Response;
