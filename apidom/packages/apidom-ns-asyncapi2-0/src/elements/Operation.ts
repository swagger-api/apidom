import { Attributes, Meta, ObjectElement } from 'minim';

class Operation extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'operation';
    this.classes.push('operation');
    this.attributes.set('symbols', ['operation']);
    this.attributes.set('docs', 'AsyncAPI_specification_2.0.0_AsyncAPI_Initiative.html#operationObject');

  }
}

export default Operation;
