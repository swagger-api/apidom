import { Attributes, Meta, StringElement } from 'minim';

class Annotation extends StringElement {
  // classes: warning | error

  constructor(content: Array<unknown>, meta: Meta, attributes: Attributes) {
    super(content, meta, attributes);
    this.element = 'annotation';
  }

  get code(): any {
    return this.attributes.get('code');
  }

  set code(value: any) {
    this.attributes.set('code', value);
  }
}

export default Annotation;
