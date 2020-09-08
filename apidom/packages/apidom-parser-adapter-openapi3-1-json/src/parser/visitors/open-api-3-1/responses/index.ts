import stampit from 'stampit';
import { always, test } from 'ramda';

import MixedFieldsJsonObjectVisitor from '../../generics/MixedFieldsJsonObjectVisitor';

const ResponsesVisitor = stampit(MixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Responses']),
    fieldPatternPredicate: test(/^\d{3}$/),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new this.namespace.elements.Responses();
  },
});

export default ResponsesVisitor;
