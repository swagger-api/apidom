import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';
import { FallbackVisitor, MapVisitor } from '@swagger-api/apidom-ns-openapi-3-0';

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
