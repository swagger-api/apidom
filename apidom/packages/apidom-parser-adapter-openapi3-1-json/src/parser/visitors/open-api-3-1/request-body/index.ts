import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const RequestBodyVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'RequestBody']),
  },
  init() {
    this.element = new this.namespace.elements.RequestBody();
  },
});

export default RequestBodyVisitor;
