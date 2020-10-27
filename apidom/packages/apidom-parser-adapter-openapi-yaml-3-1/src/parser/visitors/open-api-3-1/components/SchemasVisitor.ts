import stampit from 'stampit';
import { always } from 'ramda';

import MapYamlMappingVisitor from '../../generics/MapYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const SchemasVisitor = stampit(KindVisitor, MapYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Schema']),
  },
  init() {
    this.element = new this.namespace.elements.Object();
    this.element.classes.push('schemas');
  },
});

export default SchemasVisitor;
