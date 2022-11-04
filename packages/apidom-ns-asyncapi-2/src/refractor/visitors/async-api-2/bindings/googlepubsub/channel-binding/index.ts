import stampit from 'stampit';
import { always } from 'ramda';

import GooglepubsubChannelBindingElement from '../../../../../../elements/bindings/googlepubsub/GooglepubsubChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const GooglepubsubChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'googlepubsub', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new GooglepubsubChannelBindingElement();
  },
});

export default GooglepubsubChannelBindingVisitor;
