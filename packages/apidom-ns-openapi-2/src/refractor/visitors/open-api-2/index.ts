import stampit from 'stampit';
import { always } from 'ramda';

import SwaggerElement from '../../../elements/Swagger';
import FallbackVisitor from '../FallbackVisitor';
import FixedFieldsVisitor from '../generics/FixedFieldsVisitor';

const SwaggerVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Swagger']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new SwaggerElement();
  },
});

export default SwaggerVisitor;
