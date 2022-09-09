import stampit from 'stampit';
import { always } from 'ramda';
import { MediaTypeEncodingElement } from '@swagger-api/apidom-ns-openapi-3-0';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const EncodingVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Encoding']),
  },
  init() {
    this.element = new MediaTypeEncodingElement();
  },
});

export default EncodingVisitor;
