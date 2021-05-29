import stampit from 'stampit';
import { always } from 'ramda';

import Mqtt5MessageBindingElement from '../../../../../../elements/bindings/mqtt5/Mqtt5MessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const Mqtt5MessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'mqtt5', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new Mqtt5MessageBindingElement();
  },
});

export default Mqtt5MessageBindingVisitor;
