import stampit from 'stampit';
import { always } from 'ramda';

import SolaceOperationBindingElement from '../../../../../../elements/bindings/solace/SolaceOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const SolaceOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'solace', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new SolaceOperationBindingElement();
  },
});

export default SolaceOperationBindingVisitor;
