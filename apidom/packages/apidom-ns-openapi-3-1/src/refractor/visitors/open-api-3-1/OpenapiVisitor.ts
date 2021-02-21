import stampit from 'stampit';
import { StringElement } from 'apidom';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import OpenapiElement from '../../../elements/Openapi';
import { BREAK } from '../../../traversal/visitor';

const OpenapiVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    String(stringElement: StringElement) {
      const openapiElement = new OpenapiElement(stringElement.toValue());

      this.copyMetaAndAttributes(stringElement, openapiElement);

      this.element = openapiElement;
      return BREAK;
    },
  },
});

export default OpenapiVisitor;
