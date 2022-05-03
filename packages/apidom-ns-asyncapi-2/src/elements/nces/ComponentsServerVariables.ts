import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class ComponentsServerVariables extends ObjectElement {
  static primaryClass = 'components-server-variables';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsServerVariables.primaryClass);
  }
}

export default ComponentsServerVariables;
