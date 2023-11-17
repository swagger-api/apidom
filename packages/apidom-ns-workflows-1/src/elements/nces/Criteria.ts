import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class Criteria extends ArrayElement {
  static primaryClass = 'criteria';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(Criteria.primaryClass);
  }
}

export default Criteria;
