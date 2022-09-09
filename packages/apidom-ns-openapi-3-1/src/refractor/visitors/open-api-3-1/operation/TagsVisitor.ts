import stampit from 'stampit';
import { ArrayElement, BREAK } from '@swagger-api/apidom-core';
import { OperationTagsElement } from '@swagger-api/apidom-ns-openapi-3-0';

import FallbackVisitor from '../../FallbackVisitor';

const TagsVisitor = stampit(FallbackVisitor, {
  init() {
    this.element = new OperationTagsElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = this.element.concat(arrayElement);

      return BREAK;
    },
  },
});

export default TagsVisitor;
