import stampit from 'stampit';
import { always } from 'ramda';

import MercureServerBindingElement from '../../../../../../elements/bindings/mercure/MercureServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const MercureServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'mercure', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new MercureServerBindingElement();
  },
});

export default MercureServerBindingVisitor;
