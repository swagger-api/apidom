import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import {
  ComponentsSchemasElement,
  MapVisitor,
  MapVisitorOptions,
  FallbackVisitor,
  SpecPath,
  FallbackVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

export interface SchemasVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class SchemasVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsSchemasElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Schema']>;

  constructor(options: SchemasVisitorOptions) {
    super(options);
    this.element = new ComponentsSchemasElement();
    this.specPath = always(['document', 'objects', 'Schema']);
  }
}

export default SchemasVisitor;
