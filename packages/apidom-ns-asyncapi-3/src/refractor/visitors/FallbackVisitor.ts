import { Element, BREAK, cloneDeep } from '@swagger-api/apidom-core';
import Visitor from './Visitor.ts';

class FallbackVisitor extends Visitor {
  enter(element: Element) {
    this.element = cloneDeep(element);
    return BREAK;
  }
}

export default FallbackVisitor;
