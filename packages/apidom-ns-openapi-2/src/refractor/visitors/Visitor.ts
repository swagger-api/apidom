import { Element, cloneDeep } from '@swagger-api/apidom-core';

export interface VisitorOptions {}

class Visitor {
  public element!: Element;

  constructor(options: VisitorOptions = {}) {
    Object.assign(this, options);
  }

  // eslint-disable-next-line class-methods-use-this
  public copyMetaAndAttributes(from: Element, to: Element) {
    // copy meta
    if (from.meta.length > 0) {
      to.meta = cloneDeep(from.meta); // eslint-disable-line no-param-reassign
    }

    // copy attributes
    if (from.attributes.length > 0) {
      to.attributes = cloneDeep(from.attributes); // eslint-disable-line no-param-reassign
    }
  }
}

export default Visitor;
