import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from 'apidom';

import MapVisitor from '../generics/MapVisitor';
import FallbackVisitor from '../FallbackVisitor';

const ContentVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'MediaType']),
  },
  init() {
    this.element = new ObjectElement();
    this.element.classes.push('content');
  },
});

export default ContentVisitor;
