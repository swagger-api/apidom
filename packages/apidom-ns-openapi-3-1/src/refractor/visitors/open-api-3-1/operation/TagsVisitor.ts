import stampit from 'stampit';
import { ArrayElement, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';

const TagsVisitor = stampit(FallbackVisitor, {
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = arrayElement.clone();
      this.element.classes.push('operation-tags');

      return BREAK;
    },
  },
});

export default TagsVisitor;
