import stampit from 'stampit';
import { StringElement, ArrayElement, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../FallbackVisitor';

const TypeVisitor = stampit(FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      this.element = stringElement.clone();
      this.element.classes.push('json-schema-type');

      return BREAK;
    },
    ArrayElement(arrayElement: ArrayElement) {
      this.element = arrayElement.clone();
      this.element.classes.push('json-schema-type');

      return BREAK;
    },
  },
});

export default TypeVisitor;
