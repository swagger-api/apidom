import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsVisitor from '../generics/FixedFieldsVisitor';
import FallbackVisitor from '../FallbackVisitor';
import OpenApi3_1Element from '../../../elements/OpenApi3-1';

const OpenApi3_1Visitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'OpenApi']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new OpenApi3_1Element();
  },
});

export default OpenApi3_1Visitor;
