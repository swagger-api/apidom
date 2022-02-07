import stampit from 'stampit';
import { always } from 'ramda';

import SolaceChannelBindingElement from '../../../../../../elements/bindings/solace/SolaceChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const SolaceChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'solace', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new SolaceChannelBindingElement();
  },
});

export default SolaceChannelBindingVisitor;
