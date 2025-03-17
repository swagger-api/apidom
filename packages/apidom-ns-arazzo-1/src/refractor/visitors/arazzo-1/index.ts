import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import ArazzoSpecification1Element from '../../../elements/ArazzoSpecification1.ts';

/**
 * @public
 */
export interface ArazzoSpecificationVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ArazzoSpecificationVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public readonly element: ArazzoSpecification1Element;

  protected readonly specPath: SpecPath<['document', 'objects', 'ArazzoSpecification']>;

  protected readonly canSupportSpecificationExtensions: true;

  constructor(options: ArazzoSpecificationVisitorOptions) {
    super(options);
    this.element = new ArazzoSpecification1Element();
    this.specPath = always(['document', 'objects', 'ArazzoSpecification']);
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    return FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);
  }
}

export default ArazzoSpecificationVisitor;
