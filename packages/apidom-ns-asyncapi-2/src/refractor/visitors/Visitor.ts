import { Element, ObjectElement, deepmerge, hasElementSourceMap } from '@swagger-api/apidom-core';

export interface VisitorOptions {}

class Visitor {
  public element!: Element;

  constructor(options: VisitorOptions) {
    Object.assign(this, options);
  }

  /* eslint-disable class-methods-use-this, no-param-reassign */
  public copyMetaAndAttributes(from: Element, to: Element) {
    if (from.meta.length > 0 || to.meta.length > 0) {
      to.meta = deepmerge(to.meta, from.meta) as ObjectElement;
      if (hasElementSourceMap(from)) {
        // avoid deep merging of source maps
        to.meta.set('sourceMap', from.meta.get('sourceMap'));
      }
    }
    if (from.attributes.length > 0 || from.meta.length > 0) {
      to.attributes = deepmerge(to.attributes, from.attributes) as ObjectElement; // eslint-disable-line no-param-reassign
    }
  }
  /* eslint-enable- class-methods-use-this, no-param-reassign */
}

export default Visitor;
