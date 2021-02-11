import stampit from 'stampit';
import { ArrayElement } from 'apidom';

import { BREAK } from '../../../../traversal/visitor';
import FallbackVisitor from '../../FallbackVisitor';
import { appendMetadata } from '../../../metadata';

const TagsVisitor = stampit(FallbackVisitor, {
  methods: {
    array(arrayElement: ArrayElement) {
      this.element = arrayElement.clone();

      appendMetadata(['tags'], this.element);

      return BREAK;
    },
  },
});

export default TagsVisitor;
