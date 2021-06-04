import stampit from 'stampit';
import { test } from 'ramda';
import { Element, ObjectElement } from 'apidom';

import CallbackElement from '../../../../elements/Callback';
import PatternedFieldsJsonObjectVisitor from '../../generics/PatternedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import MapVisitor from '../../generics/MapVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';
import ReferenceElement from '../../../../elements/Reference';

const CallbackVisitor = stampit(PatternedFieldsJsonObjectVisitor, FallbackVisitor, {
  props: {
    fieldPatternPredicate: test(/{(?<expression>.*)}/),
    specPath: (element: Element) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'PathItem'];
    },
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new CallbackElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MapVisitor.compose.methods.ObjectElement.call(this, objectElement);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'pathItem');
      });

      return result;
    },
  },
});

export default CallbackVisitor;
