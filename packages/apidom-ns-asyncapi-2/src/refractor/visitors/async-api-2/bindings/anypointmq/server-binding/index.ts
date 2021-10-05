import stampit from 'stampit';
import { always } from 'ramda';

import AnypointmqServerBindingElement from '../../../../../../elements/bindings/anypointmq/AnypointmqServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AnypointmqServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'anypointmq', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AnypointmqServerBindingElement();
  },
});

export default AnypointmqServerBindingVisitor;
