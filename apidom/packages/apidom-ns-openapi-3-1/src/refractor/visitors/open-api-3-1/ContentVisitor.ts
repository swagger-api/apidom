import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from 'apidom';

import { appendMetadata } from '../../metadata';
import MapVisitor from '../generics/MapVisitor';
import FallbackVisitor from '../FallbackVisitor';

const ContentVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'MediaType']),
  },
  init() {
    this.element = new ObjectElement();
    appendMetadata(['content'], this.element);
  },
});

export default ContentVisitor;
