import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';
import ParentSchemaAwareVisitor, {
  ParentSchemaAwareVisitorOptions,
} from './ParentSchemaAwareVisitor';
import { isJSONReferenceLikeElement } from '../../predicates';

export interface DependenciesVisitorOptions
  extends MapVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

class DependenciesVisitor extends Mixin(MapVisitor, ParentSchemaAwareVisitor, FallbackVisitor) {
  public declare readonly element: ObjectElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'JSONReference'] | ['document', 'objects', 'JSONSchema']
  >;

  constructor(options: DependenciesVisitorOptions) {
    super(options);
    this.element = new ObjectElement();
    this.element.classes.push('json-schema-dependencies');
    this.specPath = (element: unknown) =>
      isJSONReferenceLikeElement(element)
        ? ['document', 'objects', 'JSONReference']
        : ['document', 'objects', 'JSONSchema'];
  }
}

export default DependenciesVisitor;
