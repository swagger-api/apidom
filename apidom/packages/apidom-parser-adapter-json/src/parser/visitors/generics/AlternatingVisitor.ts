import stampit from 'stampit';
import { ifElse, always, Pred } from 'ramda';
import { dispatch, stubUndefined } from 'ramda-adjunct';

import { BREAK } from '../index';
import SpecificationVisitor from '../SpecificationVisitor';

const AlternatingVisitor = stampit(SpecificationVisitor, {
  props: {
    alternator: [],
  },
  methods: {
    object(jsonObject) {
      const functions = this.alternator.map(
        ({ predicate, specPath }: { predicate: Pred; specPath: string[] }) =>
          ifElse(predicate, always(specPath), stubUndefined),
      );
      const specPath = dispatch(functions)(jsonObject);

      this.element = this.nodeToElement(specPath, jsonObject);

      this.maybeAddSourceMap(jsonObject, this.element);

      return BREAK;
    },
  },
});

export default AlternatingVisitor;
