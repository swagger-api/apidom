import stampit from 'stampit';
import { always } from 'ramda';

import GooglePubSubOperationBindingElement from '../../../../../../elements/bindings/googlepubsub/GooglePubSubOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const GooglePubSubOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'googlepubsub', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new GooglePubSubOperationBindingElement();
  },
});

export default GooglePubSubOperationBindingVisitor;
