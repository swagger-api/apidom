import stampit from 'stampit';
import { always } from 'ramda';
// @ts-ignore
import { appendMetadata } from 'apidom-parser-adapter-yaml-1-2';

import { KindVisitor } from '../../generics';
import MapYamlMappingVisitor from '../../generics/MapYamlMappingVisitor';

const VariablesVisitor = stampit(KindVisitor, MapYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ServerVariable']),
  },
  init() {
    this.element = new this.namespace.elements.Object();
    appendMetadata(['variables'], this.element);
  },
});

export default VariablesVisitor;
