import stampit from 'stampit';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import SwaggerVersionElement from '../../../elements/SwaggerVersion';

const SwaggerVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      const swaggerVersionElement = new SwaggerVersionElement(toValue(stringElement));

      this.copyMetaAndAttributes(stringElement, swaggerVersionElement);

      this.element = swaggerVersionElement;
      return BREAK;
    },
  },
});

export default SwaggerVisitor;
