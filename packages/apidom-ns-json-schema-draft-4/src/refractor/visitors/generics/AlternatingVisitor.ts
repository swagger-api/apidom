import stampit from 'stampit';
import { ifElse, always } from 'ramda';
import { dispatch, stubUndefined } from 'ramda-adjunct';
import { Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor from '../SpecificationVisitor';

const AlternatingVisitor = stampit(SpecificationVisitor, {
  props: {
    alternator: [],
  },
  methods: {
    enter(element: Element) {
      const functions = this.alternator.map(
        ({ predicate, specPath }: { predicate: (val: unknown) => boolean; specPath: string[] }) =>
          ifElse(predicate, always(specPath), stubUndefined),
      );
      const specPath = dispatch(functions)(element);

      this.element = this.toRefractedElement(specPath, element);

      return BREAK;
    },
  },
});

export default AlternatingVisitor;
