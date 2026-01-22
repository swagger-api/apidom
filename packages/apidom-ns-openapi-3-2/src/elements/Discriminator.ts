import { StringElement, Attributes, Meta } from '@swagger-api/apidom-core';
import { DiscriminatorElement } from '@swagger-api/apidom-ns-openapi-3-1';

/**
 * @public
 */
class Discriminator extends DiscriminatorElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
  }

  /**
   * OpenAPI 3.2: Default schema mapping to use when discriminator value doesn't match any mapping.
   */
  get defaultMapping(): StringElement | undefined {
    return this.get('defaultMapping');
  }

  set defaultMapping(defaultMapping: StringElement | undefined) {
    this.set('defaultMapping', defaultMapping);
  }
}

export default Discriminator;
