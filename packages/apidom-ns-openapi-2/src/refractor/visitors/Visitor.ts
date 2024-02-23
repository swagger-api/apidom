import { Element, ObjectElement, mergeRight } from '@swagger-api/apidom-core';

export interface VisitorOptions {}

class Visitor {
  public element!: Element;

  constructor(options: VisitorOptions = {}) {
    Object.assign(this, options);
  }

  // eslint-disable-next-line class-methods-use-this
  public copyMetaAndAttributes(from: Element, to: Element) {
    to.meta = mergeRight(to.meta, from.meta) as ObjectElement; // eslint-disable-line no-param-reassign
    to.attributes = mergeRight(to.attributes, from.attributes) as ObjectElement; // eslint-disable-line no-param-reassign
  }
}

export default Visitor;
