import stampit from 'stampit';
import { ObjectElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';
import { FallbackVisitor } from '@swagger-api/apidom-ns-openapi-3-0';

const DependentRequiredVisitor = stampit(FallbackVisitor, {
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      this.element = cloneDeep(objectElement);
      this.element.classes.push('json-schema-dependentRequired');

      return BREAK;
    },
  },
});

export default DependentRequiredVisitor;
