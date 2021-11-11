import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class ServerVariables extends ObjectElement {
  static primaryClass = 'server-variables';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ServerVariables.primaryClass);
  }
}

export default ServerVariables;
