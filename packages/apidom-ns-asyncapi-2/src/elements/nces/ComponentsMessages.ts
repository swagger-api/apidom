import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class ComponentsMessages extends ObjectElement {
  static primaryClass = 'components-messages';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsMessages.primaryClass);
  }
}

export default ComponentsMessages;
