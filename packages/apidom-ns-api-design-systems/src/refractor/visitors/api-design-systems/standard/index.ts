import stampit from 'stampit';
import { always } from 'ramda';

import StandardElement from '../../../../elements/Standard';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const StandardVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Standard']),
  },
  init() {
    this.element = new StandardElement();
  },
});

export default StandardVisitor;
