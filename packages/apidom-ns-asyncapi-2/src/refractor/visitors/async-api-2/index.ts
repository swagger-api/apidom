import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsVisitor from '../generics/FixedFieldsVisitor';
import FallbackVisitor from '../FallbackVisitor';
import AsyncApi2Element from '../../../elements/AsyncApi2';

const AsyncApi2Visitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'AsyncApi']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new AsyncApi2Element();
  },
});

export default AsyncApi2Visitor;
