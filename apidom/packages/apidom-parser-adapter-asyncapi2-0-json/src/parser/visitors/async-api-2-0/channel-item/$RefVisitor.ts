import stampit from 'stampit';

import SpecificationVisitor from '../../SpecificationVisitor';
import { BREAK } from '../..';

const $RefVisitor = stampit(SpecificationVisitor, {
  methods: {
    string(stringNode) {
      const refElement = new this.namespace.elements.Ref(stringNode.value);
      refElement.path = stringNode.value;
      this.element = this.maybeAddSourceMap(stringNode, refElement);

      return BREAK;
    },
  },
});

export default $RefVisitor;
