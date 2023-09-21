import stampit from 'stampit';
import { StringElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';
import { FallbackVisitor } from '@swagger-api/apidom-ns-openapi-3-0';

const $refVisitor = stampit(FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      this.element = cloneDeep(stringElement);
      this.element.classes.push('reference-value');

      return BREAK;
    },
  },
});

export default $refVisitor;
