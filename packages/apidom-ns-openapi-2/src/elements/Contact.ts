import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class Contact extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'contact';
  }

  get name(): StringElement | undefined {
    return this.get('name');
  }

  set name(name: StringElement | undefined) {
    this.set('name', name);
  }

  get url(): StringElement | undefined {
    return this.get('url');
  }

  set url(url: StringElement | undefined) {
    this.set('url', url);
  }

  get email(): StringElement | undefined {
    return this.get('email');
  }

  set email(email: StringElement | undefined) {
    this.set('email', email);
  }
}

export default Contact;
