import stampit from 'stampit';
import { StringElement } from 'apidom';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import AsyncApiVersionElement from '../../../elements/AsyncApiVersion';
import { BREAK } from '../../../traversal/visitor';

const AsyncApiVersionVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    string(stringElement: StringElement) {
      const openapiElement = new AsyncApiVersionElement(stringElement.toValue());

      this.copyMetaAndAttributes(stringElement, openapiElement);

      this.element = openapiElement;
      return BREAK;
    },
  },
});

export default AsyncApiVersionVisitor;
