import stampit from 'stampit';
import { always } from 'ramda';

import GooglepubsubOperationBindingElement from '../../../../../../elements/bindings/googlepubsub/GooglepubsubOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const GooglepubsubOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'googlepubsub', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new GooglepubsubOperationBindingElement();
  },
});

export default GooglepubsubOperationBindingVisitor;
