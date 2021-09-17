import stampit from 'stampit';
import { always } from 'ramda';

import IbmmqServerBindingElement from '../../../../../../elements/bindings/ibmmq/IbmmqServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const IbmmqServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'ibmmq', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new IbmmqServerBindingElement();
  },
});

export default IbmmqServerBindingVisitor;
