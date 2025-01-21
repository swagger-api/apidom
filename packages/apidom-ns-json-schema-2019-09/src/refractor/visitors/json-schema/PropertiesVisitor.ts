import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';
import {
  FallbackVisitor,
  FallbackVisitorOptions,
  MapVisitor,
  MapVisitorOptions,
  ParentSchemaAwareVisitor,
  ParentSchemaAwareVisitorOptions,
  SpecPath,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

/**
 * @public
 */
export interface PropertiesVisitorOptions
  extends MapVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class PropertiesVisitor extends Mixin(MapVisitor, ParentSchemaAwareVisitor, FallbackVisitor) {
  declare public readonly element: ObjectElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'JSONSchema']>;

  constructor(options: PropertiesVisitorOptions) {
    super(options);
    this.element = new ObjectElement();
    this.element.classes.push('json-schema-properties');
    this.specPath = always(['document', 'objects', 'JSONSchema']);
  }
}

export default PropertiesVisitor;
