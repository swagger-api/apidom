import stampit from 'stampit';
import { ifElse, always, Pred } from 'ramda';
import { dispatch, stubUndefined } from 'ramda-adjunct';
import { ObjectElement } from 'apidom';

import { BREAK } from '../../../traversal/visitor';
import SpecificationVisitor from '../SpecificationVisitor';

const AlternatingVisitor = stampit(SpecificationVisitor, {
  props: {
    alternator: [],
  },
  methods: {
    object(objectElement: ObjectElement) {
      const functions = this.alternator.map(
        ({ predicate, specPath }: { predicate: Pred; specPath: string[] }) =>
          ifElse(predicate, always(specPath), stubUndefined),
      );
      const specPath = dispatch(functions)(objectElement);

      this.element = this.toRefractedElement(specPath, objectElement);

      return BREAK;
    },
  },
});

export default AlternatingVisitor;
