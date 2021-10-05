import stampit from 'stampit';
import { always } from 'ramda';

import AnypointmqMessageBindingElement from '../../../../../../elements/bindings/anypointmq/AnypointmqMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AnypointmqMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'anypointmq', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AnypointmqMessageBindingElement();
  },
});

export default AnypointmqMessageBindingVisitor;
