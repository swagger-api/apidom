import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';
import MapVisitor from '../../generics/MapVisitor';

const PatternPropertiesVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Schema']),
  },
  init() {
    this.element = new ObjectElement();
    this.element.classes.push('json-schema-patternProperties');
  },
});

export default PatternPropertiesVisitor;
