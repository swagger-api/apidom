import stampit from 'stampit';
import { always } from 'ramda';

import GooglepubsubServerBindingElement from '../../../../../../elements/bindings/googlepubsub/GooglepubsubServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const GooglepubsubServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'googlepubsub', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new GooglepubsubServerBindingElement();
  },
});

export default GooglepubsubServerBindingVisitor;
