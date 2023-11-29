import stampit from 'stampit';
import { always } from 'ramda';

import StepElement from '../../../../elements/Step';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const StepVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Step']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new StepElement();
  },
});

export default StepVisitor;
