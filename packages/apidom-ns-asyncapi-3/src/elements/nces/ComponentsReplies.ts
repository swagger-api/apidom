import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';
/**
 * @public
 */
class ComponentsReplies extends ObjectElement {
  static primaryClass = 'components-replies';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsReplies.primaryClass);
  }
}

export default ComponentsReplies;
