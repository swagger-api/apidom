import stampit from 'stampit';
import { always } from 'ramda';

import RequirementElement from '../../../../elements/Requirement';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const RequirementVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Requirement']),
  },
  init() {
    this.element = new RequirementElement();
  },
});

export default RequirementVisitor;
