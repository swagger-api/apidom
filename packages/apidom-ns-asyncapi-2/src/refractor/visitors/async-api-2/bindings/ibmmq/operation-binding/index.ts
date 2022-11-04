import stampit from 'stampit';
import { always } from 'ramda';

import IbmmqOperationBindingElement from '../../../../../../elements/bindings/ibmmq/IbmmqOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const IbmmqOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'ibmmq', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new IbmmqOperationBindingElement();
  },
});

export default IbmmqOperationBindingVisitor;
