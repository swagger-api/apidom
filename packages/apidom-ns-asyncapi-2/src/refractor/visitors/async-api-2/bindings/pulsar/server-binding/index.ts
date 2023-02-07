import stampit from 'stampit';
import { always } from 'ramda';

import PulsarServerBindingElement from '../../../../../../elements/bindings/pulsar/PulsarServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const PulsarServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'pulsar', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new PulsarServerBindingElement();
  },
});

export default PulsarServerBindingVisitor;
