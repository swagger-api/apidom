import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import StepDependsOnElement from '../../../../elements/nces/StepDependsOn';
import FallbackVisitor from '../../FallbackVisitor';

class DependsOnVisitor extends FallbackVisitor {
  public declare element: StepDependsOnElement;

  constructor() {
    super();
    this.element = new StepDependsOnElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    this.element = this.element.concat(cloneDeep(arrayElement));

    return BREAK;
  }
}

export default DependsOnVisitor;
