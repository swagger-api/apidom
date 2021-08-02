import stampit from 'stampit';
import { always } from 'ramda';

import ComponentsElement from '../../../../elements/Components';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const ComponentsVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Components']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ComponentsElement();
  },
});

export default ComponentsVisitor;
