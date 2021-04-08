import stampit from 'stampit';
import { ArrayElement } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';
import { appendMetadata } from '../../../metadata';

const RequiredVisitor = stampit(FallbackVisitor, {
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = arrayElement.clone();

      appendMetadata(['json-schema-required'], this.element);
    },
  },
});

export default RequiredVisitor;
