import stampit from 'stampit';
import { MemberElement, BREAK } from 'apidom';

import SpecificationVisitor from './SpecificationVisitor';

const SpecificationExtensionVisitor = stampit(SpecificationVisitor, {
  methods: {
    MemberElement(memberElement: MemberElement) {
      this.element = memberElement.clone();
      this.element.classes.push('specification-extension');

      return BREAK;
    },
  },
});

export default SpecificationExtensionVisitor;
