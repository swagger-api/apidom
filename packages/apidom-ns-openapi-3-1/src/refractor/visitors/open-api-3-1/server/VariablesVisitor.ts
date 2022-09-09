import stampit from 'stampit';
import { always } from 'ramda';
import { ServerVariablesElement } from '@swagger-api/apidom-ns-openapi-3-0';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const VariablesVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ServerVariable']),
  },
  init() {
    this.element = new ServerVariablesElement();
  },
});

export default VariablesVisitor;
