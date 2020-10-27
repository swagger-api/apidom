import stampit from 'stampit';
import { ifElse, always, Pred } from 'ramda';
import { dispatch, stubUndefined } from 'ramda-adjunct';
import { YamlMapping } from 'apidom-ast';

import { BREAK } from '..';
import SpecificationVisitor from '../SpecificationVisitor';

const AlternatingVisitor = stampit(SpecificationVisitor, {
  props: {
    alternator: [],
  },
  methods: {
    mapping(mappingNode: YamlMapping) {
      const functions = this.alternator.map(
        ({ predicate, specPath }: { predicate: Pred; specPath: string[] }) =>
          ifElse(predicate, always(specPath), stubUndefined),
      );
      const specPath = dispatch(functions)(mappingNode);

      this.element = this.nodeToElement(specPath, mappingNode);

      this.maybeAddSourceMap(mappingNode, this.element);

      return BREAK;
    },
  },
});

export default AlternatingVisitor;
