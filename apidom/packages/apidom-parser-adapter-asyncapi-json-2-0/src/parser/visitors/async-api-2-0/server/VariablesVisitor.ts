import stampit from 'stampit';
import { always } from 'ramda';
// @ts-ignore
import { appendMetadata } from 'apidom-parser-adapter-json';

import MapJsonObjectVisitor from '../../generics/MapJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const VariablesVisitor = stampit(ValueVisitor, MapJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ServerVariable']),
  },
  init() {
    this.element = new this.namespace.elements.Object();
    appendMetadata(['variables'], this.element);
  },
});

export default VariablesVisitor;
