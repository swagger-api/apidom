import stampit from 'stampit';
import { always } from 'ramda';
import { ComponentsSchemasElement } from '@swagger-api/apidom-ns-openapi-3-0';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const SchemasVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Schema']),
  },
  init() {
    this.element = new ComponentsSchemasElement();
  },
});

export default SchemasVisitor;
