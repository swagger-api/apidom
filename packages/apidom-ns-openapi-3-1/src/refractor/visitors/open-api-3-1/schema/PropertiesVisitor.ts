import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';
import MapVisitor from '../../generics/MapVisitor';
import ParentSchemaAwareVisitor from './ParentSchemaAwareVisitor';

const PropertiesVisitor = stampit(MapVisitor, ParentSchemaAwareVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Schema']),
  },
  // @ts-ignore
  init() {
    this.element = new ObjectElement();
    this.element.classes.push('json-schema-properties');
  },
});

export default PropertiesVisitor;
