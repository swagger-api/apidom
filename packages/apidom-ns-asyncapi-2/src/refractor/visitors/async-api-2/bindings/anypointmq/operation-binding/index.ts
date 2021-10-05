import stampit from 'stampit';
import { always } from 'ramda';

import AnypointmqOperationBindingElement from '../../../../../../elements/bindings/anypointmq/AnypointmqOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AnypointmqOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'anypointmq', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AnypointmqOperationBindingElement();
  },
});

export default AnypointmqOperationBindingVisitor;
