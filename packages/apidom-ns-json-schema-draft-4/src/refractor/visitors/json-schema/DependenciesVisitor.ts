import stampit from 'stampit';
import { ObjectElement, Element } from '@swagger-api/apidom-core';

import MapVisitor from '../generics/MapVisitor';
import FallbackVisitor from '../FallbackVisitor';
import ParentSchemaAwareVisitor from './ParentSchemaAwareVisitor';
import { isJSONReferenceLikeElement } from '../../predicates';

const DependenciesVisitor = stampit(MapVisitor, ParentSchemaAwareVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) =>
      isJSONReferenceLikeElement(element)
        ? ['document', 'objects', 'JSONReference']
        : ['document', 'objects', 'JSONSchema'],
  },
  init() {
    this.element = new ObjectElement();
    this.element.classes.push('json-schema-dependencies');
  },
});

export default DependenciesVisitor;
