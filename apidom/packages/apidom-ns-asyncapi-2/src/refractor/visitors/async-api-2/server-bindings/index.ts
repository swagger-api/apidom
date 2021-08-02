import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import ServerBindingsElement from '../../../../elements/ServerBindings';

const ServerBindingsVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ServerBindings']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ServerBindingsElement();
  },
});

export default ServerBindingsVisitor;
