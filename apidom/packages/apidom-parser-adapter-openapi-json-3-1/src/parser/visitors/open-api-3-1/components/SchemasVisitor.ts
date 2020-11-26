import stampit from 'stampit';
import { always } from 'ramda';
// @ts-ignore
import { appendMetadata } from 'apidom-parser-adapter-json';

import MapJsonObjectVisitor from '../../generics/MapJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const SchemasVisitor = stampit(ValueVisitor, MapJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Schema']),
  },
  init() {
    this.element = new this.namespace.elements.Object();
    appendMetadata(['schemas'], this.element);
  },
});

export default SchemasVisitor;
