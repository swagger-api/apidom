import stampit from 'stampit';
import { always } from 'ramda';

import FailureActionElement from '../../../../elements/FailureAction';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const FailureActionVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'FailureAction']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new FailureActionElement();
  },
});

export default FailureActionVisitor;
