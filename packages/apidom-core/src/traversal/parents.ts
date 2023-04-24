import stampit from 'stampit';
import { Element, ObjectElement, ArrayElement, MemberElement } from 'minim';

import { visit } from './visitor';

/* eslint-disable no-param-reassign */

const Visitor = stampit({
  props: {
    parent: null,
    parentEdges: null,
  },
  init() {
    this.parentEdges = new WeakMap();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      this.parentEdges.set(objectElement, this.parent);
      this.parent = objectElement;
    },

    ArrayElement(arrayElement: ArrayElement) {
      this.parentEdges.set(arrayElement, this.parent);
      this.parent = arrayElement;
    },

    MemberElement(memberElement: MemberElement) {
      this.parentEdges.set(memberElement, this.parent);
      this.parent = memberElement;
    },

    enter(element: Element) {
      this.parentEdges.set(element, this.parent);
    },
  },
});

/* eslint-enable */

// computes upwards edges from every child to its parent
const parents = <T extends Element>(element: T): WeakMap<Element, Element> => {
  const visitor = Visitor();

  visit(element, visitor);

  return visitor.parentEdges;
};

export default parents;
