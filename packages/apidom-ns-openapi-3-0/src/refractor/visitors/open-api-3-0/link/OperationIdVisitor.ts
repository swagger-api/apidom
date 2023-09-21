import stampit from 'stampit';
import { StringElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';

const OperationIdVisitor = stampit(FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      this.element = cloneDeep(stringElement);
      this.element.classes.push('reference-value');

      return BREAK;
    },
  },
});

export default OperationIdVisitor;
