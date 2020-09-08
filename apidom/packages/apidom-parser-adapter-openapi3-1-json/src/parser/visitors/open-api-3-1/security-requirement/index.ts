import stampit from 'stampit';
import { always } from 'ramda';

import MapJsonObjectVisitor from '../../generics/MapJsonObjectVisitor';

const SecurityRequirementVisitor = stampit(MapJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'SecurityRequirement']),
  },
  init() {
    this.element = new this.namespace.elements.SecurityRequirement();
  },
});

export default SecurityRequirementVisitor;
