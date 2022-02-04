import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class ComponentsChannels extends ObjectElement {
  static primaryClass = 'components-channels';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsChannels.primaryClass);
  }
}

export default ComponentsChannels;
