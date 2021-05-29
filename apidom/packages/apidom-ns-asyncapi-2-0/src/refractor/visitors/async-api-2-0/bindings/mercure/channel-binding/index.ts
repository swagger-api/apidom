import stampit from 'stampit';
import { always } from 'ramda';

import MercureChannelBindingElement from '../../../../../../elements/bindings/mercure/MercureChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const MercureChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'mercure', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new MercureChannelBindingElement();
  },
});

export default MercureChannelBindingVisitor;
