import stampit from 'stampit';
import { ArrayElement, BREAK } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';

const RequiredVisitor = stampit(FallbackVisitor, {
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = arrayElement.clone();
      this.element.classes.push('json-schema-required');

      return BREAK;
    },
  },
});

export default RequiredVisitor;
