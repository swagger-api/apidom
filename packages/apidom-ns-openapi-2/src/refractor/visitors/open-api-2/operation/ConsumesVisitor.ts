import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import OperationConsumesElement from '../../../../elements/nces/OperationConsumes';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export type { FallbackVisitorOptions as ConsumesVisitorOptions };

class ConsumesVisitor extends FallbackVisitor {
  public declare element: OperationConsumesElement;

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
