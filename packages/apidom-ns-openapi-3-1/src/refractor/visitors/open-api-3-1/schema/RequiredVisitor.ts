import stampit from 'stampit';
import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';
import { FallbackVisitor } from '@swagger-api/apidom-ns-openapi-3-0';

const RequiredVisitor = stampit(FallbackVisitor, {
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = cloneDeep(arrayElement);
      this.element.classes.push('json-schema-required');

      return BREAK;
    },
  },
});

export default RequiredVisitor;
