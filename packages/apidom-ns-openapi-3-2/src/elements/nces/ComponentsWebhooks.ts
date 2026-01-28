import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class ComponentsWebhooks extends ObjectElement {
  static primaryClass = 'components-webhooks';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsWebhooks.primaryClass);
  }
}

export default ComponentsWebhooks;
