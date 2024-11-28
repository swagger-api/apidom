import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';
import {
  FallbackVisitor,
  FallbackVisitorOptions,
  MapVisitor,
  MapVisitorOptions,
  SpecPath,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ParentSchemaAwareVisitor, {
  ParentSchemaAwareVisitorOptions,
} from './ParentSchemaAwareVisitor.ts';

/**
 * @public
 */
export interface $defsVisitorOptions
  extends MapVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class $defsVisitor extends Mixin(MapVisitor, ParentSchemaAwareVisitor, FallbackVisitor) {
  declare public readonly element: ObjectElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Schema']>;

  constructor(options: $defsVisitorOptions) {
    super(options);
    this.element = new ObjectElement();
    this.element.classes.push('json-schema-$defs');
    this.specPath = always(['document', 'objects', 'Schema']);
    this.passingOptionsNames.push('parent');
  }
}

export default $defsVisitor;
