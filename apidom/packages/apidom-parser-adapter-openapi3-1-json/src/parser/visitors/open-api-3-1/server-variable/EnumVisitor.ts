import stampit from 'stampit';
import SpecificationVisitor from '../../SpecificationVisitor';
import { BREAK, visit } from '../..';

const EnumVisitor = stampit(SpecificationVisitor, {
  methods: {
    array(arrayNode) {
      const arrayVisitor = this.retrieveVisitorInstance(['array']);
      visit(arrayNode, arrayVisitor);
      this.element = this.maybeAddSourceMap(arrayNode, arrayVisitor.element);

      return BREAK;
    },
  },
});

export default EnumVisitor;
