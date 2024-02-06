import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SwaggerConsumesElement from '../../../elements/nces/SwaggerConsumes';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';

export type { FallbackVisitorOptions as ConsumesVisitorOptions };

class ConsumesVisitor extends FallbackVisitor {
  public declare element: SwaggerConsumesElement;

  constructor(options: FallbackVisitorOptions) {
    super(options);
    this.element = new SwaggerConsumesElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    this.element = this.element.concat(cloneDeep(arrayElement));

    return BREAK;
  }
}

export default ConsumesVisitor;
