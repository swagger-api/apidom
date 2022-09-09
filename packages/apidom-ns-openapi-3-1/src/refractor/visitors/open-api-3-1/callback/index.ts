import stampit from 'stampit';
import { test } from 'ramda';
import { Element, ObjectElement, StringElement } from '@swagger-api/apidom-core';
import { isReferenceLikeElement } from '@swagger-api/apidom-ns-openapi-3-0';

import CallbackElement from '../../../../elements/Callback';
import PathItemElement from '../../../../elements/PathItem';
import ReferenceElement from '../../../../elements/Reference';
import PatternedFieldsJsonObjectVisitor from '../../generics/PatternedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import MapVisitor from '../../generics/MapVisitor';
import { isReferenceElement, isPathItemElement } from '../../../../predicates';

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

      // decorate every ReferenceElement with metadata about their referencing type
      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'pathItem');
      });

      // decorate every PathItemElement with Callback Object expression metadata
      this.element
        .filter(isPathItemElement)
        .forEach((pathItemElement: PathItemElement, key: StringElement) => {
          pathItemElement.setMetaProperty('runtime-expression', key.toValue());
        });

      return result;
    },
  },
});

export default CallbackVisitor;
