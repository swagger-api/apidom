import stampit from 'stampit';
import { ObjectElement, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';

const DependentRequiredVisitor = stampit(FallbackVisitor, {
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      this.element = objectElement.clone();
      this.element.classes.push('json-schema-dependentRequired');

      return BREAK;
    },
  },
});

export default DependentRequiredVisitor;
