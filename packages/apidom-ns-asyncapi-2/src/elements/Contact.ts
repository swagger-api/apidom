import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class Contact extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'contact';
  }

  get name(): StringElement {
    return this.get('name');
  }

  set name(name: StringElement) {
    this.set('name', name);
  }

  get url(): StringElement {
    return this.get('url');
  }

  set url(url: StringElement) {
    this.set('url', url);
  }

  get email(): StringElement {
    return this.get('email');
  }

  set email(email: StringElement) {
    this.set('email', email);
  }
}

export default Contact;
