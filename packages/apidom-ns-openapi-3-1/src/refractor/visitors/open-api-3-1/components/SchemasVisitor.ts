import stampit from 'stampit';
import { always } from 'ramda';
import {
  ComponentsSchemasElement,
  MapVisitor,
  FallbackVisitor,
} from '@swagger-api/apidom-ns-openapi-3-0';

const SchemasVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Schema']),
  },
  init() {
    this.element = new ComponentsSchemasElement();
  },
});

export default SchemasVisitor;
