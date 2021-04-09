import stampit from 'stampit';
import { ObjectElement, BREAK } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';
import { appendMetadata } from '../../../metadata';

const DependentRequiredVisitor = stampit(FallbackVisitor, {
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      this.element = objectElement.clone();

      appendMetadata(['json-schema-dependentRequired'], this.element);

      return BREAK;
    },
  },
});

export default DependentRequiredVisitor;
