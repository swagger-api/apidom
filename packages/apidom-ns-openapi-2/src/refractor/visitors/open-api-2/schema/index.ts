import stampit from 'stampit';
import { always } from 'ramda';

import SchemaElement from '../../../../elements/Schema';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const ParameterVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Schema']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new SchemaElement();
  },
});

export default ParameterVisitor;
