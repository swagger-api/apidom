import { Element, ObjectElement, ArrayElement, MemberElement } from 'minim';

import { visit } from './visitor';

class Visitor {
  public parentEdges: WeakMap<Element, Element | null>;

  private parent: Element | null = null;

  constructor() {
    this.parentEdges = new WeakMap();
  }

  public ObjectElement(objectElement: ObjectElement): void {
    this.parentEdges.set(objectElement, this.parent);
    this.parent = objectElement;
  }

  public ArrayElement(arrayElement: ArrayElement): void {
    this.parentEdges.set(arrayElement, this.parent);
    this.parent = arrayElement;
  }

  public MemberElement(memberElement: MemberElement): void {
    this.parentEdges.set(memberElement, this.parent);
    this.parent = memberElement;
  }

  public enter(element: Element): void {
    this.parentEdges.set(element, this.parent);
  }
}

// computes upwards edges from every child to its parent
const parents = <T extends Element>(element: T): WeakMap<Element, Element | null> => {
  const visitor = new Visitor();

  visit(element, visitor);

  return visitor.parentEdges;
};

export default parents;
