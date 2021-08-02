import { Attributes, Meta } from 'minim';
import { ArrayElement } from 'apidom';

class Tags extends ArrayElement {
  constructor(content?: unknown[], meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'tags';
  }
}

export default Tags;
