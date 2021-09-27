import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';
import MapVisitor from '../../generics/MapVisitor';
import ParentSchemaAwareVisitor from './ParentSchemaAwareVisitor';

const PatternPropertiesVisitor = stampit(MapVisitor, ParentSchemaAwareVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Schema']),
  },
  init() {
    this.element = new ObjectElement();
    this.element.classes.push('json-schema-patternProperties');
  },
});

export default PatternPropertiesVisitor;
