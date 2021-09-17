import stampit from 'stampit';
import { always } from 'ramda';

import CorrelationIDElement from '../../../../elements/CorrelationID';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const CorrelationIDVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'CorrelationID']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new CorrelationIDElement();
  },
});

export default CorrelationIDVisitor;
