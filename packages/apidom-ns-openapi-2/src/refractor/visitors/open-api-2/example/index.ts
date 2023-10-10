import stampit from 'stampit';
import { always } from 'ramda';

import ExampleElement from '../../../../elements/Example';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const ExampleVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Example']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new ExampleElement();
  },
});

export default ExampleVisitor;
