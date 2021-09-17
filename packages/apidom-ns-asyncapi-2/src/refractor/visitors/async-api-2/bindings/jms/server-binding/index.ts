import stampit from 'stampit';
import { always } from 'ramda';

import JmsServerBindingElement from '../../../../../../elements/bindings/jms/JmsServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const JmsServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'jms', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new JmsServerBindingElement();
  },
});

export default JmsServerBindingVisitor;
