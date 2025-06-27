import { Element, ObjectElement, hasElementSourceMap, deepmerge } from '@swagger-api/apidom-core';

/**
 * @public
 */
export interface VisitorOptions {}

/**
 * @public
 */
class Visitor {
  public element!: Element;

  constructor(options: VisitorOptions = {}) {
    Object.assign(this, options);
  }

  /* eslint-disable class-methods-use-this, no-param-reassign */
  public copyMetaAndAttributes(from: Element, to: Element) {
    if (from.meta.length > 0 || to.meta.length > 0) {
      to.meta = deepmerge(to.meta, from.meta) as ObjectElement;
    }
    if (hasElementSourceMap(from)) {
      to.startPositionRow = from.startPositionRow;
      to.startPositionColumn = from.startPositionColumn;
      to.startIndex = from.startIndex;
      to.endPositionRow = from.endPositionRow;
      to.endPositionColumn = from.endPositionColumn;
      to.endIndex = from.endIndex;
    }
    if (from.attributes.length > 0 || from.meta.length > 0) {
      to.attributes = deepmerge(to.attributes, from.attributes) as ObjectElement; // eslint-disable-line no-param-reassign
    }
  }
  /* eslint-enable class-methods-use-this, no-param-reassign */
}

export default Visitor;
