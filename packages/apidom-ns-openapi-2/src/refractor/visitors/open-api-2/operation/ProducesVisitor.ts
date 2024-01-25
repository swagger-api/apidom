import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import OperationProducesElement from '../../../../elements/nces/OperationProduces';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

class ProducesVisitor extends FallbackVisitor {
  public declare element: OperationProducesElement;

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
