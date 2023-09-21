import stampit from 'stampit';
import { StringElement, ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';
import { FallbackVisitor } from '@swagger-api/apidom-ns-openapi-3-0';

const TypeVisitor = stampit(FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      this.element = cloneDeep(stringElement);
      this.element.classes.push('json-schema-type');

      return BREAK;
    },
    ArrayElement(arrayElement: ArrayElement) {
      this.element = cloneDeep(arrayElement);
      this.element.classes.push('json-schema-type');

      return BREAK;
    },
  },
});

export default TypeVisitor;
