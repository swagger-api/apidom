import { Attributes, Meta, ObjectElement } from '@swagger-api/apidom-core';
/**
 * @public
 */
class ComponentsTags extends ObjectElement {
  static primaryClass = 'components-tags';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsTags.primaryClass);
  }
}

export default ComponentsTags;