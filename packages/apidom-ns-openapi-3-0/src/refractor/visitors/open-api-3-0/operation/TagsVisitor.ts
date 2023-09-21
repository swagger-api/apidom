import stampit from 'stampit';
import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import OperationTagsElement from '../../../../elements/nces/OperationTags';
import FallbackVisitor from '../../FallbackVisitor';

const TagsVisitor = stampit(FallbackVisitor, {
  init() {
    this.element = new OperationTagsElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = this.element.concat(cloneDeep(arrayElement));

      return BREAK;
    },
  },
});

export default TagsVisitor;
