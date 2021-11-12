import { Attributes, Meta } from 'minim';
import { ArrayElement } from '@swagger-api/apidom-core';

class Tags extends ArrayElement {
  static primaryClass = 'tags';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(Tags.primaryClass);
  }
}

export default Tags;
