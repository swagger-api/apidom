import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class Workflows extends ArrayElement {
  static primaryClass = 'workflows';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(Workflows.primaryClass);
  }
}

export default Workflows;
