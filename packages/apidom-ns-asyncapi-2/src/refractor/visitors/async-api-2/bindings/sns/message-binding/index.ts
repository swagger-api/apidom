import stampit from 'stampit';
import { always } from 'ramda';

import SnsMessageBindingElement from '../../../../../../elements/bindings/sns/SnsMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const SnsMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'sns', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new SnsMessageBindingElement();
  },
});

export default SnsMessageBindingVisitor;
