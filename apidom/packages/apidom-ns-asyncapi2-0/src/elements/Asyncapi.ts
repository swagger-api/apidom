import { Attributes, Meta, StringElement } from 'minim';

class Asyncapi extends StringElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'asyncapi';
    this.classes.push('specVersion');
    this.attributes.set('symbols', ['specVersion']);
  }
}

export default Asyncapi;
