import stampit from 'stampit';
import { MemberElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SpecificationVisitor from './SpecificationVisitor';

const SpecificationExtensionVisitor = stampit(SpecificationVisitor, {
  methods: {
    MemberElement(memberElement: MemberElement) {
      this.element = cloneDeep(memberElement);
      this.element.classes.push('specification-extension');

      return BREAK;
    },
  },
});

export default SpecificationExtensionVisitor;
