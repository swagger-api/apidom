import stampit from 'stampit';
import { always } from 'ramda';

import ParameterElement from '../../../../elements/Parameter';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

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
