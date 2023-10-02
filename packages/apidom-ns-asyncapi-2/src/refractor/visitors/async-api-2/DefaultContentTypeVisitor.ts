import stampit from 'stampit';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import DefaultContentTypeElement from '../../../elements/DefaultContentType';

const DefaultContentTypeVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      const defaultContentTypeElement = new DefaultContentTypeElement(toValue(stringElement));

      this.copyMetaAndAttributes(stringElement, defaultContentTypeElement);

      this.element = defaultContentTypeElement;
      return BREAK;
    },
  },
});

export default DefaultContentTypeVisitor;
