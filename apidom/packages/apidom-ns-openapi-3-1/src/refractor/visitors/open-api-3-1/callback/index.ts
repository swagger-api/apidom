import stampit from 'stampit';
import { always } from 'ramda';

import CallbackElement from '../../../../elements/Callback';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const CallbackVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Callback']),
  },
  init() {
    this.element = new CallbackElement();
  },
});

export default CallbackVisitor;
