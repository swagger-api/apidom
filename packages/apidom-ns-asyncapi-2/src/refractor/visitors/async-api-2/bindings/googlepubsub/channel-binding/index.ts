import stampit from 'stampit';
import { always } from 'ramda';

import GooglePubSubChannelBindingElement from '../../../../../../elements/bindings/googlepubsub/GooglePubSubChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const GooglePubSubChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'googlepubsub', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new GooglePubSubChannelBindingElement();
  },
});

export default GooglePubSubChannelBindingVisitor;
