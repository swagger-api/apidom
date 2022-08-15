import stampit from 'stampit';
import { ObjectElement, BooleanElement, BREAK } from '@swagger-api/apidom-core';
import {
  SpecificationVisitor,
  FallbackVisitor,
  isJSONReferenceLikeElement,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

const PropertyNamesVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      const specPath = isJSONReferenceLikeElement(objectElement)
        ? ['document', 'objects', 'JSONReference']
        : ['document', 'objects', 'JSONSchema'];
      this.element = this.toRefractedElement(specPath, objectElement);

      return BREAK;
    },
    BooleanElement(booleanElement: BooleanElement) {
      this.element = this.toRefractedElement(['document', 'objects', 'JSONSchema'], booleanElement);

      return BREAK;
    },
  },
});

export default PropertyNamesVisitor;
