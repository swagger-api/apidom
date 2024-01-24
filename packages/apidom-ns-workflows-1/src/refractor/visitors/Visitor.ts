import { hasElementSourceMap, Element } from '@swagger-api/apidom-core';

export interface VisitorOptions {}

class Visitor {
  public element!: Element;

  constructor(options: VisitorOptions = {}) {
    Object.assign(this, options);
  }

  // eslint-disable-next-line class-methods-use-this
  public copyMetaAndAttributes(from: Element, to: Element) {
    // copy sourcemaps
    if (hasElementSourceMap(from)) {
      to.meta.set('sourceMap', from.meta.get('sourceMap'));
    }
  }
}

export default Visitor;
