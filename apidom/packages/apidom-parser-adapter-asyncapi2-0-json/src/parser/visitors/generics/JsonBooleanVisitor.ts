import stampit from 'stampit';
import { BREAK } from '..';
import SpecificationVisitor from '../SpecificationVisitor';

const JsonBooleanVisitor = stampit(SpecificationVisitor, {
  methods: {
    true(trueNode) {
      const booleanElement = new this.namespace.elements.Boolean(true);
      this.element = this.maybeAddSourceMap(trueNode, booleanElement);

      return BREAK;
    },
    false(falseNode) {
      const booleanElement = new this.namespace.elements.Boolean(false);
      this.element = this.maybeAddSourceMap(falseNode, booleanElement);

      return BREAK;
    },
  },
});

export default JsonBooleanVisitor;
