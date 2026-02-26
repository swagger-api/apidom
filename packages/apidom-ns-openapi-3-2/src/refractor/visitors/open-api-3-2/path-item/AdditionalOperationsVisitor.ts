import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';
import {
  MapVisitor,
  MapVisitorOptions,
  FallbackVisitor,
  SpecPath,
  FallbackVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-1';

/**
 * @public
 */
export interface AdditionalOperationsVisitorOptions
  extends MapVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AdditionalOperationsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ObjectElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Operation']>;

  constructor(options: AdditionalOperationsVisitorOptions) {
    super(options);
    this.element = new ObjectElement();
    this.specPath = always(['document', 'objects', 'Operation']);
  }
}

export default AdditionalOperationsVisitor;
