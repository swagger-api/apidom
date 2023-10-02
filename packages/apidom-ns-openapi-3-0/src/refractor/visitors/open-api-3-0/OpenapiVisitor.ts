import stampit from 'stampit';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import OpenapiElement from '../../../elements/Openapi';

const OpenapiVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      const openapiElement = new OpenapiElement(toValue(stringElement));

      this.copyMetaAndAttributes(stringElement, openapiElement);

      this.element = openapiElement;
      return BREAK;
    },
  },
});

export default OpenapiVisitor;
