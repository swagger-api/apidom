import stampit from 'stampit';
import { always } from 'ramda';

import PrincipleElement from '../../../../elements/Principle';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const PrincipleVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Principle']),
  },
  init() {
    this.element = new PrincipleElement();
  },
});

export default PrincipleVisitor;
