import stampit from 'stampit';
import { always } from 'ramda';

import MercureMessageBindingElement from '../../../../../../elements/bindings/mercure/MercureMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const MercureMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'mercure', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new MercureMessageBindingElement();
  },
});

export default MercureMessageBindingVisitor;
