import stampit from 'stampit';
import { always } from 'ramda';

import Mqtt5ServerBindingElement from '../../../../../../elements/bindings/mqtt5/Mqtt5ServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const Mqtt5ServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'mqtt5', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new Mqtt5ServerBindingElement();
  },
});

export default Mqtt5ServerBindingVisitor;
