import stampit from 'stampit';
import { always } from 'ramda';

import MercureOperationBindingElement from '../../../../../../elements/bindings/mercure/MercureOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const MercureOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'mercure', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new MercureOperationBindingElement();
  },
});

export default MercureOperationBindingVisitor;
