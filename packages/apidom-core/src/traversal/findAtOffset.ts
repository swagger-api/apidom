import { last, pathOr } from 'ramda';
import { isNumber } from 'ramda-adjunct';
import { Element } from 'minim';

import { hasElementSourceMap } from '../predicates';
import { visit } from './visitor';
import toValue from '../transformers/serializers/value';

interface VisitorOptions {
  readonly offset?: number;
  readonly includeRightBound?: boolean;
}

class Visitor {
  public result: any[];

  private readonly offset: number;

  private readonly includeRightBound: boolean;

  constructor({ offset = 0, includeRightBound = false }: VisitorOptions = {}) {
    this.result = [];
    this.offset = offset;
    this.includeRightBound = includeRightBound;
  }

  public enter(element: any): false | undefined {
    if (!hasElementSourceMap(element)) {
      return undefined; // dive in
    }

    const sourceMapElement = element.getMetaProperty('sourceMap');
    const charStart = toValue(sourceMapElement.positionStart.get(2));
    const charEnd = toValue(sourceMapElement.positionEnd.get(2));
    const isWithinOffsetRange =
      this.offset >= charStart &&
      (this.offset < charEnd || (this.includeRightBound && this.offset <= charEnd));

    if (isWithinOffsetRange) {
      this.result.push(element);
      return undefined; // push to stack and dive in
    }

    return false; // skip entire sub-tree
  }
}

interface FindAtOffsetOptions {
  offset: number;
  includeRightBound?: boolean;
}

// Finds the most inner node at the given offset.
// If includeRightBound is set, also finds nodes that end at the given offset.
// findAtOffset :: Number -> Element -> Element | Undefined
const findAtOffset = <T extends Element>(
  options: number | FindAtOffsetOptions,
  element: T,
): T | undefined => {
  let offset: number;
  let includeRightBound: boolean;

  if (isNumber(options)) {
    offset = options;
    includeRightBound = false;
  } else {
    offset = pathOr(0, ['offset'], options);
    includeRightBound = pathOr(false, ['includeRightBound'], options);
  }

  const visitor = new Visitor({ offset, includeRightBound });

  visit(element, visitor);

  return last<T>(visitor.result);
};

export default findAtOffset;
