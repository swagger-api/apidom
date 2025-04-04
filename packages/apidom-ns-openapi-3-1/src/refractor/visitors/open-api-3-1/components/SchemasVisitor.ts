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

/**
 * @public
 */
export interface SchemasVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class SchemasVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ComponentsSchemasElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Schema']>;

  constructor(options: SchemasVisitorOptions) {
    super(options);
    this.element = new ComponentsSchemasElement();
    this.specPath = always(['document', 'objects', 'Schema']);
  }
}

export default SchemasVisitor;
