import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class ParameterContent extends ObjectElement {
  static primaryClass = 'parameter-content';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ParameterContent.primaryClass);
    this.classes.push('content');
  }
}

export default ParameterContent;
