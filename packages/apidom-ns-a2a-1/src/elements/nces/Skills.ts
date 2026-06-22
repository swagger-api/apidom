import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Skills extends ArrayElement {
  static primaryClass = 'skills';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(Skills.primaryClass);
  }
}

export default Skills;
