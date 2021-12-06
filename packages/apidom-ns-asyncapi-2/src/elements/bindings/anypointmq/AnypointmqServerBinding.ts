import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class AnypointmqServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'anypointmqServerBinding';
    this.classes.push('server-binding');
  }
}

export default AnypointmqServerBinding;
