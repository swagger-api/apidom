import stampit from 'stampit';
import { always } from 'ramda';

import CriterionElement from '../../../../elements/Criterion';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const CriterionVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Criterion']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new CriterionElement();
  },
});

export default CriterionVisitor;
