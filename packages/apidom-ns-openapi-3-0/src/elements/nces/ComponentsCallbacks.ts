import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class ComponentsCallbacks extends ObjectElement {
  static primaryClass = 'components-callbacks';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsCallbacks.primaryClass);
  }
}

export default ComponentsCallbacks;
