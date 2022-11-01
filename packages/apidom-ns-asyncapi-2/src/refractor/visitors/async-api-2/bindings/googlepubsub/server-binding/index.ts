import stampit from 'stampit';
import { always } from 'ramda';

import GooglePubSubServerBindingElement from '../../../../../../elements/bindings/googlepubsub/GooglePubSubServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const GooglePubSubServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'googlepubsub', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new GooglePubSubServerBindingElement();
  },
});

export default GooglePubSubServerBindingVisitor;
