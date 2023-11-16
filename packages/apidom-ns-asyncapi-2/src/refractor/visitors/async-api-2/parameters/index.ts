import stampit from 'stampit';
import { test } from 'ramda';
import { Element, ObjectElement } from '@swagger-api/apidom-core';

import PatternedFieldsVisitor from '../../generics/PatternedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import ParametersElement from '../../../../elements/Parameters';
import { isReferenceLikeElement, isParameterLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';
import ReferenceElement from '../../../../elements/Reference';

const ParametersVisitor = stampit(PatternedFieldsVisitor, FallbackVisitor, {
  props: {
    fieldPatternPredicate: test(/^[A-Za-z0-9_-]+$/),
    specPath: (element: Element) => {
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : isParameterLikeElement(element)
          ? ['document', 'objects', 'Parameter']
          : ['value'];
    },
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new ParametersElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = PatternedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'parameter');
      });

      return result;
    },
  },
});

export default ParametersVisitor;
