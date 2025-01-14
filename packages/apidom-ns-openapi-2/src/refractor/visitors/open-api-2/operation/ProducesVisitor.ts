import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import OperationProducesElement from '../../../../elements/nces/OperationProduces.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

export type { FallbackVisitorOptions as ProducesVisitorOptions };

/**
 * @public
 */
class ProducesVisitor extends FallbackVisitor {
  declare public element: OperationProducesElement;

  constructor(options: FallbackVisitorOptions) {
    super(options);
    this.element = new OperationProducesElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    this.element = this.element.concat(cloneDeep(arrayElement));

    return BREAK;
  }
}

export default ProducesVisitor;
