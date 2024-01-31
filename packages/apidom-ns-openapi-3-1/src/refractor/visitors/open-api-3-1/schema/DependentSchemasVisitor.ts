import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';
import {
  FallbackVisitor,
  MapVisitor,
  MapVisitorOptions,
  SpecPath,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ParentSchemaAwareVisitor, {
  ParentSchemaAwareVisitorOptions,
} from './ParentSchemaAwareVisitor';

export interface DependentSchemasVisitorOptions
  extends MapVisitorOptions,
    ParentSchemaAwareVisitorOptions {}

class DependentSchemasVisitor extends Mixin(MapVisitor, ParentSchemaAwareVisitor, FallbackVisitor) {
  public declare readonly element: ObjectElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'Schema']>;

  constructor(options: DependentSchemasVisitorOptions) {
    super(options);
    this.element = new ObjectElement();
    this.element.classes.push('json-schema-dependentSchemas');
    this.specPath = always(['document', 'objects', 'Schema']);
    this.passingOptionsNames.push('parent');
  }
}

export default DependentSchemasVisitor;
