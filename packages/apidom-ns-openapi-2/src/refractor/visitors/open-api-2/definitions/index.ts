import stampit from 'stampit';
import { ObjectElement, Element } from '@swagger-api/apidom-core';
import {
  isJSONReferenceLikeElement,
  isJSONReferenceElement,
  JSONReferenceElement,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

import DefinitionsElement from '../../../../elements/Definitions';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const DefinitionsVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: <T extends Element>(element: T) => {
      return isJSONReferenceLikeElement(element)
        ? ['document', 'objects', 'JSONReference']
        : ['document', 'objects', 'Schema'];
    },
  },
  init() {
    this.element = new DefinitionsElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MapVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // decorate every JSONReferenceElement with metadata about their referencing type
      this.element
        .filter(isJSONReferenceElement)
        .forEach((referenceElement: JSONReferenceElement) => {
          referenceElement.setMetaProperty('referenced-element', 'schema');
        });

      return result;
    },
  },
});

export default DefinitionsVisitor;
