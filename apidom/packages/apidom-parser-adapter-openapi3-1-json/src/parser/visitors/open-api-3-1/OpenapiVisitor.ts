import stampit from 'stampit';
import { BREAK } from 'apidom-ast';
import SpecificationVisitor from '../SpecificationVisitor';

const OpenapiVisitor = stampit(SpecificationVisitor, {
  methods: {
    string(stringNode) {
      const openapiElement = new this.namespace.elements.Openapi(stringNode.value);
      this.element = this.maybeAddSourceMap(stringNode, openapiElement);
      return BREAK;
    },
  },
});

export default OpenapiVisitor;
