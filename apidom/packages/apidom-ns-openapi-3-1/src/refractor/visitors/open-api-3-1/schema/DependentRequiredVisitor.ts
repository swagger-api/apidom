import stampit from 'stampit';
import { ArrayElement } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';
import { appendMetadata } from '../../../metadata';

const DependentRequiredVisitor = stampit(FallbackVisitor, {
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = arrayElement.clone();

      appendMetadata(['json-schema-dependentRequired'], this.element);
    },
  },
});

export default DependentRequiredVisitor;
