import { Attributes, Meta, StringElement } from 'minim';

class AsyncApiVersion extends StringElement {
  constructor(content?: string, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'asyncApiVersion';
  }
}

export default AsyncApiVersion;
