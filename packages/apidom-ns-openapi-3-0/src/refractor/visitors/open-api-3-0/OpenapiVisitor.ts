import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';
import OpenapiElement from '../../../elements/Openapi';

export interface OpenapiVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

class OpenapiVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare element: OpenapiElement;

  StringElement(stringElement: StringElement) {
    const openapiElement = new OpenapiElement(toValue(stringElement));

    this.copyMetaAndAttributes(stringElement, openapiElement);

    this.element = openapiElement;
    return BREAK;
  }
}

export default OpenapiVisitor;
