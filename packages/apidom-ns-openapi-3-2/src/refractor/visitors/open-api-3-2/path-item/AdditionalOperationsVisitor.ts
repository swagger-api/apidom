import { Mixin } from 'ts-mixer';
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
    // OpenAPI 3.2: additionalOperations values are Operation Objects only (not Reference Objects).
    this.specPath = () => ['document', 'objects', 'Operation'];
  }

  ObjectElement(objectElement: ObjectElement) {
    return MapVisitor.prototype.ObjectElement.call(this, objectElement);
  }
}

export default AdditionalOperationsVisitor;
