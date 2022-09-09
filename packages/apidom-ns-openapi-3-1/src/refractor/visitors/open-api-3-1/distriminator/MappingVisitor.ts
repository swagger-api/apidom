import stampit from 'stampit';
import { always } from 'ramda';
import { DiscriminatorMappingElement } from '@swagger-api/apidom-ns-openapi-3-0';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const MappingVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['value']),
  },
  init() {
    this.element = new DiscriminatorMappingElement();
  },
});

export default MappingVisitor;
