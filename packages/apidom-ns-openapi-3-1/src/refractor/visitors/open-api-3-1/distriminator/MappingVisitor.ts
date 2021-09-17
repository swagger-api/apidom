import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from 'apidom';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const MappingVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['value']),
  },
  init() {
    this.element = new ObjectElement();
    this.element.classes.push('mapping');
  },
});

export default MappingVisitor;
