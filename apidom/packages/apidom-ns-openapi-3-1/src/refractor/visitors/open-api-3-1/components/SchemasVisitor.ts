import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from 'apidom';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { appendMetadata } from '../../../metadata';

const SchemasVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Schema']),
  },
  init() {
    this.element = new ObjectElement();
    appendMetadata(['schemas'], this.element);
  },
});

export default SchemasVisitor;
