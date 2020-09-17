import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const ResponseVisitor = stampit(ValueVisitor, FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Response']),
  },
  init() {
    this.element = new this.namespace.elements.Response();
  },
});

export default ResponseVisitor;
