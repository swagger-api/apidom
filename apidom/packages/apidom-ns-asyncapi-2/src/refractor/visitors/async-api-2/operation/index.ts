import stampit from 'stampit';
import { always } from 'ramda';

import OperationElement from '../../../../elements/Operation';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const OperationVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Operation']),
  },
  init() {
    this.element = new OperationElement();
  },
});

export default OperationVisitor;
