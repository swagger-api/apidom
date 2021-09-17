import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';
import MapVisitor from '../../generics/MapVisitor';
import ParentSchemaAwareVisitor from './ParentSchemaAwareVisitor';

const $defsVisitor = stampit(MapVisitor, ParentSchemaAwareVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Schema']),
  },
  init() {
    this.element = new ObjectElement();
    this.element.classes.push('json-schema-$defs');
  },
});

export default $defsVisitor;
