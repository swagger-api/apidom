import stampit from 'stampit';

import { BREAK } from '../../traversal/visitor';
import SpecificationVisitor from './SpecificationVisitor';
import { appendMetadata } from '../metadata';

const SpecificationExtensionVisitor = stampit(SpecificationVisitor, {
  methods: {
    member(memberElement) {
      this.element = memberElement.clone();
      appendMetadata(['specification-extension'], this.element);
      return BREAK;
    },
  },
});

export default SpecificationExtensionVisitor;
