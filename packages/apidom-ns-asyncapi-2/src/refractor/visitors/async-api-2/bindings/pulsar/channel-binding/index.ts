import stampit from 'stampit';
import { always } from 'ramda';

import PulsarChannelBindingElement from '../../../../../../elements/bindings/pulsar/PulsarChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const PulsarChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'pulsar', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new PulsarChannelBindingElement();
  },
});

export default PulsarChannelBindingVisitor;
