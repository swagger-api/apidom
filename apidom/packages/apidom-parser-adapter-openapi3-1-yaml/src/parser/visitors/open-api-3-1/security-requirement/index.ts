import stampit from 'stampit';
import { always } from 'ramda';

import MapYamlMappingVisitor from '../../generics/MapYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const SecurityRequirementVisitor = stampit(KindVisitor, MapYamlMappingVisitor, {
  props: {
    specPath: always(['kind']),
  },
  init() {
    this.element = new this.namespace.elements.SecurityRequirement();
  },
});

export default SecurityRequirementVisitor;
