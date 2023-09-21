import stampit from 'stampit';
import { BREAK } from '@swagger-api/apidom-ast';
import { ArrayElement, cloneDeep } from '@swagger-api/apidom-core';
import { FallbackVisitor } from '@swagger-api/apidom-ns-openapi-3-0';

const EnumVisitor = stampit(FallbackVisitor, {
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = cloneDeep(arrayElement);
      this.element.classes.push('json-schema-enum');

      return BREAK;
    },
  },
});

export default EnumVisitor;
