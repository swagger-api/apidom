import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import OperationConsumesElement from '../../../../elements/nces/OperationConsumes.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

export type { FallbackVisitorOptions as ConsumesVisitorOptions };

/**
 * @public
 */
class ConsumesVisitor extends FallbackVisitor {
  declare public element: OperationConsumesElement;

  constructor(options: FallbackVisitorOptions) {
    super(options);
    this.element = new OperationConsumesElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    this.element = this.element.concat(cloneDeep(arrayElement));

    return BREAK;
  }
}

export default ConsumesVisitor;
