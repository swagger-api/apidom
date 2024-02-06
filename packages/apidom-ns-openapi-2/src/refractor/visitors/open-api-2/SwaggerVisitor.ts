import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import SwaggerVersionElement from '../../../elements/SwaggerVersion';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';

export interface SwaggerVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

class SwaggerVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare element: SwaggerVersionElement;

  StringElement(stringElement: StringElement) {
    const swaggerVersionElement = new SwaggerVersionElement(toValue(stringElement));

    this.copyMetaAndAttributes(stringElement, swaggerVersionElement);

    this.element = swaggerVersionElement;
    return BREAK;
  }
}

export default SwaggerVisitor;
