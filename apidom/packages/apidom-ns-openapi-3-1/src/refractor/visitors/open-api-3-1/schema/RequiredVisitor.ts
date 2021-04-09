import stampit from 'stampit';
import { ArrayElement, BREAK } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';
import { appendMetadata } from '../../../metadata';

const RequiredVisitor = stampit(FallbackVisitor, {
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = arrayElement.clone();

      appendMetadata(['json-schema-required'], this.element);

      return BREAK;
    },
  },
});

export default RequiredVisitor;
