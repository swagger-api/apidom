import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SwaggerConsumesElement from '../../../elements/nces/SwaggerConsumes.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

export type { FallbackVisitorOptions as ConsumesVisitorOptions };

/**
 * @public
 */
class ConsumesVisitor extends FallbackVisitor {
  declare public element: SwaggerConsumesElement;

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
