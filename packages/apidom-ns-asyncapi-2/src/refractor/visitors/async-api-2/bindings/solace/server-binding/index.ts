import stampit from 'stampit';
import { always } from 'ramda';

import SolaceServerBindingElement from '../../../../../../elements/bindings/solace/SolaceServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const SolaceServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'solace', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new SolaceServerBindingElement();
  },
});

export default SolaceServerBindingVisitor;
