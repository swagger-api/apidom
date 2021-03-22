import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from 'apidom';

import { appendMetadata } from '../../../metadata';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const VariablesVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ServerVariable']),
  },
  init() {
    this.element = new ObjectElement();
    appendMetadata(['variables'], this.element);
  },
});

export default VariablesVisitor;
