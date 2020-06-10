import { Attributes, Meta, ObjectElement } from 'minim';

class License extends ObjectElement {
  constructor(content: Record<string, unknown>, meta: Meta, attributes: Attributes) {
    super(content, meta, attributes);
    this.element = 'license';
  }

  get name(): string {
    return this.get('name');
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
}

export default License;
