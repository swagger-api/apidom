import stampit from 'stampit';
import { MemberElement, BREAK } from 'apidom';

import SpecificationVisitor from './SpecificationVisitor';
import { appendMetadata } from '../metadata';

const SpecificationExtensionVisitor = stampit(SpecificationVisitor, {
  methods: {
    MemberElement(memberElement: MemberElement) {
      this.element = memberElement.clone();
      appendMetadata(['specification-extension'], this.element);
      return BREAK;
    },
  },
});

export default SpecificationExtensionVisitor;
