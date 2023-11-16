import stampit from 'stampit';
import { test } from 'ramda';
import { Element, ObjectElement } from '@swagger-api/apidom-core';

import PatternedFieldsVisitor from '../../generics/PatternedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import ServersElement from '../../../../elements/Servers';
import ReferenceElement from '../../../../elements/Reference';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

const ServersVisitor = stampit(PatternedFieldsVisitor, FallbackVisitor, {
  props: {
    fieldPatternPredicate: test(/^[A-Za-z0-9_-]+$/),
    specPath: (element: Element) => {
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Server'];
    },
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new ServersElement();
    this.element.classes.push('servers');
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = PatternedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'server');
      });

      return result;
    },
  },
});

export default ServersVisitor;
