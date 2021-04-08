import stampit from 'stampit';
import { ObjectElement, BREAK } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';
import { appendMetadata } from '../../../metadata';

const $vocabularyVisitor = stampit(FallbackVisitor, {
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      this.element = objectElement.clone();

      appendMetadata(['json-schema-$vocabulary'], this.element);

      return BREAK;
    },
  },
});

export default $vocabularyVisitor;
