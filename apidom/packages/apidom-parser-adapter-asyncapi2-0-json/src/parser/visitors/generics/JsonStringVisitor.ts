import stampit from 'stampit';
import { BREAK } from '..';
import SpecificationVisitor from '../SpecificationVisitor';

const JsonStringVisitor = stampit(SpecificationVisitor, {
  methods: {
    string(stringNode) {
      const stringElement = new this.namespace.elements.String(stringNode.value);
      this.element = this.maybeAddSourceMap(stringNode, stringElement);

      return BREAK;
    },
  },
});

export default JsonStringVisitor;
