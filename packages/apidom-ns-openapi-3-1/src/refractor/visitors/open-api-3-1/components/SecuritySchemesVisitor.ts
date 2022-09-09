import stampit from 'stampit';
import { ObjectElement, Element } from '@swagger-api/apidom-core';
import {
  isReferenceLikeElement,
  ComponentsSecuritySchemesElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ReferenceElement from '../../../../elements/Reference';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceElement } from '../../../../predicates';

const ParametersVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'SecurityScheme'];
    },
  },
  init() {
    this.element = new ComponentsSecuritySchemesElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MapVisitor.compose.methods.ObjectElement.call(this, objectElement);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'securityScheme');
      });

      return result;
    },
  },
});

export default ParametersVisitor;
