import stampit from 'stampit';
import { ArrayElement, BREAK } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';
import { appendMetadata } from '../../../metadata';

const TagsVisitor = stampit(FallbackVisitor, {
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = arrayElement.clone();

      appendMetadata(['tags'], this.element);

      return BREAK;
    },
  },
});

export default TagsVisitor;
