import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SwaggerProducesElement from '../../../elements/nces/SwaggerProduces';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';

class ProducesVisitor extends FallbackVisitor {
  public declare element: SwaggerProducesElement;

  constructor(options: FallbackVisitorOptions) {
    super(options);
    this.element = new SwaggerProducesElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    this.element = this.element.concat(cloneDeep(arrayElement));

    return BREAK;
  }
}

export default ProducesVisitor;
