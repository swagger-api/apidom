import stampit from 'stampit';
import { always } from 'ramda';

import MapJsonObjectVisitor from '../generics/MapJsonObjectVisitor';

const PathsVisitor = stampit(MapJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'PathItem']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new this.namespace.elements.Paths();
  },
});

export default PathsVisitor;
