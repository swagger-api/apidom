import { Attributes, Meta, ObjectElement } from 'minim';

class Contact extends ObjectElement {
  constructor(content: Array<unknown>, meta: Meta, attributes: Attributes) {
    super(content, meta, attributes);
    this.element = 'contact';
  }

  get name(): string {
    return this.get('name').toValue();
  }

  set name(name: string) {
    this.set('name', name);
  }

  get url(): string {
    return this.get('url');
  }

  set url(url: string) {
    this.set('url', url);
  }

  get email(): string {
    return this.get('email');
  }

  set email(email: string) {
    this.set('email', email);
  }
}

export default Contact;
