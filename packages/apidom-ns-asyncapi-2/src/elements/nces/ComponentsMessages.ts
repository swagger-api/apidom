import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class ComponentsMessages extends ObjectElement {
  static primaryClass = 'components-messages';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsMessages.primaryClass);
  }
}

export default ComponentsMessages;
