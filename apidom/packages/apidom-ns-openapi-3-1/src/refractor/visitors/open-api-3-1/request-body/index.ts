import stampit from 'stampit';
import { always } from 'ramda';

import RequestBodyElement from '../../../../elements/RequestBody';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const RequestBodyVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'RequestBody']),
  },
  init() {
    this.element = new RequestBodyElement();
  },
});

export default RequestBodyVisitor;
