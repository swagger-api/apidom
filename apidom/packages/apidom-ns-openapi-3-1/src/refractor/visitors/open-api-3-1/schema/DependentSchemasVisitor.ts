import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';
import { appendMetadata } from '../../../metadata';
import MapVisitor from '../../generics/MapVisitor';

const DependentSchemasVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Schema']),
  },
  init() {
    this.element = new ObjectElement();
    appendMetadata(['json-schema-dependentSchemas'], this.element);
  },
});

export default DependentSchemasVisitor;
