import {
  ObjectElement,
  hasElementSourceMap,
  deepmerge,
  Element,
  assignSourceMap,
} from '@swagger-api/apidom-core';

/**
 * @public
 */
export interface VisitorOptions {}

/**
 * @public
 */
class Visitor {
  public element!: Element;

  constructor(options: VisitorOptions) {
    Object.assign(this, options);
  }

  /* eslint-disable class-methods-use-this, no-param-reassign */
  public copyMetaAndAttributes(from: Element, to: Element) {
    if (from.meta.length > 0 || to.meta.length > 0) {
      to.meta = deepmerge(to.meta, from.meta) as ObjectElement;
    }
    if (hasElementSourceMap(from)) {
      assignSourceMap(to, from);
    }
    if (from.attributes.length > 0 || from.meta.length > 0) {
      to.attributes = deepmerge(to.attributes, from.attributes) as ObjectElement;
    }
  }
}

export default Visitor;
