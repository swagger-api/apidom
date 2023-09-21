import stampit from 'stampit';
import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';
import { FallbackVisitor } from '@swagger-api/apidom-ns-json-schema-draft-4';

const ExamplesVisitor = stampit(FallbackVisitor, {
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = cloneDeep(arrayElement);
      this.element.classes.push('json-schema-examples');

      return BREAK;
    },
  },
});

export default ExamplesVisitor;
