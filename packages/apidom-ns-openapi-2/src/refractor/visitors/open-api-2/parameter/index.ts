import stampit from 'stampit';
import { always } from 'ramda';

import ParameterElement from '../../../../elements/Parameter';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const ParameterVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Parameter']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ParameterElement();
  },
});

export default ParameterVisitor;
