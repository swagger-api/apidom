import stampit from 'stampit';
import { always } from 'ramda';

import PulsarMessageBindingElement from '../../../../../../elements/bindings/pulsar/PulsarMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const PulsarMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'pulsar', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new PulsarMessageBindingElement();
  },
});

export default PulsarMessageBindingVisitor;
