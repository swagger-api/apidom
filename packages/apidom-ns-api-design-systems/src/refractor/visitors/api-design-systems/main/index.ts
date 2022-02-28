import stampit from 'stampit';
import { always } from 'ramda';

import MainElement from '../../../../elements/Main';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const MainVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Main']),
  },
  init() {
    this.element = new MainElement();
  },
});

export default MainVisitor;
