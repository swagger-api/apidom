import { Attributes, Meta, ObjectElement, StringElement } from 'minim';

class MyLicense extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mylicense';
  }

  get name(): StringElement {
    return this.get('name');
  }

  set name(name: StringElement) {
    this.set('name', name);
  }

  get identifier(): StringElement {
    return this.get('identifier');
  }

  set identifier(name: StringElement) {
    this.set('identifier', name);
  }

  get url(): StringElement {
    return this.get('url');
  }

  set url(url: StringElement) {
    this.set('url', url);
  }
}

export default MyLicense;
