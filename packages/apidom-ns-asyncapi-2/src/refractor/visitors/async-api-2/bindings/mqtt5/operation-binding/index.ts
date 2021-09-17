import stampit from 'stampit';
import { always } from 'ramda';

import Mqtt5OperationBindingElement from '../../../../../../elements/bindings/mqtt5/Mqtt5OperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const Mqtt5OperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'mqtt5', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new Mqtt5OperationBindingElement();
  },
});

export default Mqtt5OperationBindingVisitor;
