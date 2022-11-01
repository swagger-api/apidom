import stampit from 'stampit';
import { always } from 'ramda';

import GooglePubSubMessageBindingElement from '../../../../../../elements/bindings/googlepubsub/GooglePubSubMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const GooglePubSubMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'googlepubusb', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new GooglePubSubMessageBindingElement();
  },
});

export default GooglePubSubMessageBindingVisitor;
