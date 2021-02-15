import stampit from 'stampit';
import { StringElement } from 'apidom';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import AsyncApiVersionElement from '../../../elements/AsyncApiVersion';
import { BREAK } from '../../../traversal/visitor';

const AsyncApiVersionVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    string(stringElement: StringElement) {
      const asyncApiVersionElement = new AsyncApiVersionElement(stringElement.toValue());

      this.copyMetaAndAttributes(stringElement, asyncApiVersionElement);

      this.element = asyncApiVersionElement;
      return BREAK;
    },
  },
});

export default AsyncApiVersionVisitor;
