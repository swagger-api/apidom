import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SwaggerProducesElement from '../../../elements/nces/SwaggerProduces.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

export type { FallbackVisitorOptions as ProducesVisitorOptions };

/**
 * @public
 */
class ProducesVisitor extends FallbackVisitor {
  declare public element: SwaggerProducesElement;

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
