import { Attributes, Meta } from 'minim';
import { ArrayElement } from '@swagger-api/apidom-core';

class StandardIdentifier extends ArrayElement {
  constructor(content?: string[], meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'standardIdentifier';
  }
}

export default StandardIdentifier;
