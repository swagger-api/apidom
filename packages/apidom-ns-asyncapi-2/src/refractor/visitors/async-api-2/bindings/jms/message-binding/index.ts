import stampit from 'stampit';
import { always } from 'ramda';

import JmsMessageBindingElement from '../../../../../../elements/bindings/jms/JmsMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const JmsMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'jms', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new JmsMessageBindingElement();
  },
});

export default JmsMessageBindingVisitor;
