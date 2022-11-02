import stampit from 'stampit';
import { always } from 'ramda';

import GooglepubsubMessageBindingElement from '../../../../../../elements/bindings/googlepubsub/GooglepubsubMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const GooglepubsubMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'googlepubusb', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new GooglepubsubMessageBindingElement();
  },
});

export default GooglepubsubMessageBindingVisitor;
