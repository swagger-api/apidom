import stampit from 'stampit';
import { Element, BREAK } from 'apidom';

import Visitor from './Visitor';

/**
 * This visitor is responsible for falling back to current traversed element
 * Given AsyncApi2_0Visitor expects ObjectElement to be traversed. If
 * different Element is provided FallBackVisitor is responsible to assigning
 * this Element as current element.
 */
const FallbackVisitor = stampit(Visitor, {
  methods: {
    enter(element: Element) {
      this.element = element.clone();
      return BREAK;
    },
  },
});

export default FallbackVisitor;
