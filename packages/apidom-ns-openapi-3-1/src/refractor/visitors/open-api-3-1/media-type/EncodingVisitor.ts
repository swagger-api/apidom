import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const EncodingVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Encoding']),
  },
  init() {
    this.element = new ObjectElement();
    this.element.classes.push('encoding');
  },
});

export default EncodingVisitor;
