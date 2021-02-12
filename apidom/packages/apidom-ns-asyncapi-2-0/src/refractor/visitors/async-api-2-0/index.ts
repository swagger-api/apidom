import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsVisitor from '../generics/FixedFieldsVisitor';
import FallbackVisitor from '../FallbackVisitor';
import AsyncApi2_0Element from '../../../elements/AsyncApi2-0';

const AsyncApi2_0Visitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'AsyncApi']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new AsyncApi2_0Element();
  },
});

export default AsyncApi2_0Visitor;
