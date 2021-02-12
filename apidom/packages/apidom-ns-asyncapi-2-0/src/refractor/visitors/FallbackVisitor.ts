import stampit from 'stampit';
import { Element } from 'apidom';

import { BREAK } from '../../traversal/visitor';
import Visitor from './Visitor';

/**
 * This visitor is responsible for falling back to current traversed element
 * Given OpenApi3_1Visitor expects ObjectElement to be traversed. If
 * different Element is provided FallBackVisitor is responsible to assigning
 * this Element as current element.
 */
const FallbackVisitor = stampit(Visitor, {
  methods: {
    enter(element: Element) {
      this.element = element.clone();
      this.copyMetaAndAttributes(element, this.element);
      return BREAK;
    },
  },
});

export default FallbackVisitor;
