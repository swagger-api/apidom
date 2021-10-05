import stampit from 'stampit';
import { always } from 'ramda';

import AnypointmqChannelBindingElement from '../../../../../../elements/bindings/anypointmq/AnypointmqChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AnypointmqChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'anypointmq', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AnypointmqChannelBindingElement();
  },
});

export default AnypointmqChannelBindingVisitor;
