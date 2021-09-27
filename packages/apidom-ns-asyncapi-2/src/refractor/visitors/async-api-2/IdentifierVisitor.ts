import stampit from 'stampit';
import { StringElement, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import IdentifierElement from '../../../elements/Identifier';

const IdentifierVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      const identifierElement = new IdentifierElement(stringElement.toValue());

      this.copyMetaAndAttributes(stringElement, identifierElement);

      this.element = identifierElement;
      return BREAK;
    },
  },
});

export default IdentifierVisitor;
