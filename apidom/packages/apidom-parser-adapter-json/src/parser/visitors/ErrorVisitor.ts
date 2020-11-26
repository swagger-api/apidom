import stampit from 'stampit';

import { BREAK } from './index';
import SpecificationVisitor from './SpecificationVisitor';
import { appendMetadata } from '../metadata';

const ErrorVisitor = stampit(SpecificationVisitor, {
  methods: {
    literal(literalNode) {
      if (literalNode.isMissing) {
        const message = `(Missing ${literalNode.value})`;
        this.element = new this.namespace.elements.Annotation(message);

        this.maybeAddSourceMap(literalNode, this.element);

        return BREAK;
      }

      return undefined;
    },

    error(errorNode) {
      const message = errorNode.isUnexpected
        ? `(Unexpected ${errorNode.value})`
        : `(Error ${errorNode.value})`;

      this.element = new this.namespace.elements.Annotation(message);
      appendMetadata(['error'], this.element);

      this.maybeAddSourceMap(errorNode, this.element);

      return BREAK;
    },
  },
});

export default ErrorVisitor;
