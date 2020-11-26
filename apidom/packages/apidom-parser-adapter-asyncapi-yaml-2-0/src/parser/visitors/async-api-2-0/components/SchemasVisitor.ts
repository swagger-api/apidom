import stampit from 'stampit';
import { always } from 'ramda';
// @ts-ignore
import { appendMetadata } from 'apidom-parser-adapter-yaml-1-2';

import MapYamlMappingVisitor from '../../generics/MapYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const SchemasVisitor = stampit(KindVisitor, MapYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Schema']),
  },
  init() {
    this.element = new this.namespace.elements.Object();
    appendMetadata(['schemas'], this.element);
  },
});

export default SchemasVisitor;
