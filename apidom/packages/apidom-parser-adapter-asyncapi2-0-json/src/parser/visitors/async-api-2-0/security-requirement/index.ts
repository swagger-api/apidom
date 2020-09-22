import stampit from 'stampit';
import { always } from 'ramda';

import MapJsonObjectVisitor from '../../generics/MapJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const SecurityRequirementVisitor = stampit(ValueVisitor, MapJsonObjectVisitor, {
  props: {
    specPath: always(['array']),
  },
  init() {
    this.element = new this.namespace.elements.SecurityRequirement();
  },
});

export default SecurityRequirementVisitor;
