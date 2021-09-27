import stampit from 'stampit';
import { ObjectElement, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';

const $vocabularyVisitor = stampit(FallbackVisitor, {
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      this.element = objectElement.clone();
      this.element.classes.push('json-schema-$vocabulary');

      return BREAK;
    },
  },
});

export default $vocabularyVisitor;
