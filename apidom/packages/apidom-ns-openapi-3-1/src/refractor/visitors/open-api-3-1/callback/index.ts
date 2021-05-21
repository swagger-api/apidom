import stampit from 'stampit';
import { test } from 'ramda';
import { Element } from 'apidom';

import CallbackElement from '../../../../elements/Callback';
import PatternedFieldsJsonObjectVisitor from '../../generics/PatternedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement, isPathItemLikeElement } from '../../../predicates';

const CallbackVisitor = stampit(PatternedFieldsJsonObjectVisitor, FallbackVisitor, {
  props: {
    fieldPatternPredicate: test(/^{(?<expression>.*)}$/),
    specPath: (element: Element) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : isPathItemLikeElement(element)
        ? ['document', 'objects', 'PathItem']
        : ['value'];
    },
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new CallbackElement();
  },
});

export default CallbackVisitor;
