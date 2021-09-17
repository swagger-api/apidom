import stampit from 'stampit';
import { always } from 'ramda';

import SnsServerBindingElement from '../../../../../../elements/bindings/sns/SnsServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const SnsServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'sns', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new SnsServerBindingElement();
  },
});

export default SnsServerBindingVisitor;
