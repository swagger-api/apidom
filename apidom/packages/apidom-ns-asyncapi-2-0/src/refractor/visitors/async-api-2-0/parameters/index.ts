import stampit from 'stampit';
import { test } from 'ramda';
import { Element } from 'apidom';

import PatternedFieldsVisitor from '../../generics/PatternedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import ParametersElement from '../../../../elements/Parameters';
import { isReferenceLikeElement, isParameterLikeElement } from '../../../predicates';

const ParametersVisitor = stampit(PatternedFieldsVisitor, FallbackVisitor, {
  props: {
    fieldPatternPredicate: test(/^[A-Za-z0-9_-]+$/),
    specPath: (element: Element) => {
      // eslint-disable-next-line no-nested-ternary
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
});

export default ParametersVisitor;
