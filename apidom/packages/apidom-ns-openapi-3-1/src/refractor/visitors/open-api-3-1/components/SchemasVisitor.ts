import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from 'apidom';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const SchemasVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Schema']),
  },
  init() {
    this.element = new ObjectElement();
    this.element.classes.push('schemas');
  },
});

export default SchemasVisitor;
