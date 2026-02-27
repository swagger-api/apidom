import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class ComponentsMediaTypes extends ObjectElement {
  static primaryClass = 'components-media-types';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsMediaTypes.primaryClass);
  }
}

export default ComponentsMediaTypes;
