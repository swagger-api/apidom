import stampit from 'stampit';
import { StringElement, BREAK } from 'apidom';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import DefaultContentTypeElement from '../../../elements/DefaultContentType';

const DefaultContentTypeVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      const defaultContentTypeElement = new DefaultContentTypeElement(stringElement.toValue());

      this.copyMetaAndAttributes(stringElement, defaultContentTypeElement);

      this.element = defaultContentTypeElement;
      return BREAK;
    },
  },
});

export default DefaultContentTypeVisitor;
