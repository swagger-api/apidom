import stampit from 'stampit';
import { always } from 'ramda';

import ExampleElement from '../../../../elements/Example';
import FallbackVisitor from '../../FallbackVisitor';
import MapVisitor from '../../generics/MapVisitor';

const ExampleVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['value']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new ExampleElement();
  },
});

export default ExampleVisitor;
