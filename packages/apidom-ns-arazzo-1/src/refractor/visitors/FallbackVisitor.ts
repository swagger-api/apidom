import { Element, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import Visitor, { VisitorOptions } from './Visitor.ts';

/**
 * This visitor is responsible for falling back to current traversed element.
 * Given ArazzoSpecificationVisitor expects ObjectElement to be traversed. If
 * different Element is provided FallBackVisitor is responsible to assigning
 * this Element as current element.
 */

export type { VisitorOptions as FallbackVisitorOptions };

/**
 * @public
 */
class FallbackVisitor extends Visitor {
  enter(element: Element) {
    this.element = cloneDeep(element);
    return BREAK;
  }
}

export default FallbackVisitor;
