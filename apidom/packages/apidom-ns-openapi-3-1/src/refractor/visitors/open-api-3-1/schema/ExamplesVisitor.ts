import stampit from 'stampit';
import { ArrayElement } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';
import { appendMetadata } from '../../../metadata';

const ExamplesVisitor = stampit(FallbackVisitor, {
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = arrayElement.clone();

      appendMetadata(['json-schema-examples'], this.element);
    },
  },
});

export default ExamplesVisitor;
