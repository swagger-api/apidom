import stampit from 'stampit';
import { always } from 'ramda';

import SolaceMessageBindingElement from '../../../../../../elements/bindings/solace/SolaceMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const SolaceMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'solace', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new SolaceMessageBindingElement();
  },
});

export default SolaceMessageBindingVisitor;
