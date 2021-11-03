import stampit from 'stampit';
import { ObjectElement, ArrayElement, isArrayElement, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';

const MessageVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      if (isReferenceLikeElement(objectElement)) {
        this.element = this.toRefractedElement(['document', 'objects', 'Reference'], objectElement);
        this.element.setMetaProperty('referenced-element', 'message');
      } else if (isArrayElement(objectElement.get('oneOf'))) {
        this.element = new ArrayElement();
        this.element.classes.push('operation-message');

        objectElement.get('oneOf').forEach((item: ObjectElement) => {
          let element;

          if (isReferenceLikeElement(item)) {
            element = this.toRefractedElement(['document', 'objects', 'Reference'], item);
          } else {
            element = this.toRefractedElement(['document', 'objects', 'Message'], item);
          }

          this.element.push(element);
        });
      } else {
        this.element = this.toRefractedElement(['document', 'objects', 'Message'], objectElement);
      }

      this.copyMetaAndAttributes(objectElement, this.element);

      return BREAK;
    },
  },
});

export default MessageVisitor;
