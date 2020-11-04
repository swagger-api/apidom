import stampit from 'stampit';
// @ts-ignore
import { SpecificationVisitor, BREAK } from 'apidom-parser-adapter-json';

import { ValueVisitor } from '../../generics';

const $RefVisitor = stampit(ValueVisitor, SpecificationVisitor, {
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
