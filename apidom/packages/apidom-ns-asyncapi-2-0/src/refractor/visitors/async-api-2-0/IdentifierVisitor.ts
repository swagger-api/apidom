import stampit from 'stampit';
import { StringElement } from 'apidom';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import IdentifierElement from '../../../elements/Identifier';
import { BREAK } from '../../../traversal/visitor';

const IdentifierVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    String(stringElement: StringElement) {
      const identifierElement = new IdentifierElement(stringElement.toValue());

      this.copyMetaAndAttributes(stringElement, identifierElement);

      this.element = identifierElement;
      return BREAK;
    },
  },
});

export default IdentifierVisitor;
