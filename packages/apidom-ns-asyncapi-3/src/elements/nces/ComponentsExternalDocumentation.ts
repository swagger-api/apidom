import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';
/**
 * @public
 */
class ComponentsExternalDocumentation extends ObjectElement {
  static primaryClass = 'components-external-documentation';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsExternalDocumentation.primaryClass);
  }
}

export default ComponentsExternalDocumentation;
