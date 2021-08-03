import stampit from 'stampit';
import { always } from 'ramda';

import IbmmqMessageBindingElement from '../../../../../../elements/bindings/ibmmq/IbmmqMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const IbmmqMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'ibmmq', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new IbmmqMessageBindingElement();
  },
});

export default IbmmqMessageBindingVisitor;
