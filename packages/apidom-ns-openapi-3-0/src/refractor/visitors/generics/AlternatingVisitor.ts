import { ifElse, always } from 'ramda';
import { dispatch, stubUndefined } from 'ramda-adjunct';
import { Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor';

export type Alternator = { predicate: (element: unknown) => boolean; specPath: string[] };

export interface AlternatingVisitorOptions extends SpecificationVisitorOptions {
  readonly alternator: Alternator[];
}

class AlternatingVisitor extends SpecificationVisitor {
  public alternator: Alternator[];

  constructor({ alternator, ...rest }: AlternatingVisitorOptions) {
    super({ ...rest });
    this.alternator = alternator || [];
  }

  enter(element: Element) {
    const functions = this.alternator.map(
      ({ predicate, specPath }: { predicate: (element: unknown) => boolean; specPath: string[] }) =>
        ifElse(predicate, always(specPath), stubUndefined),
    );
    const specPath = dispatch(functions)(element);

    this.element = this.toRefractedElement(specPath, element);

    return BREAK;
  }
}

export default AlternatingVisitor;
