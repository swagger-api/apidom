import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import SwaggerVersionElement from '../../../elements/SwaggerVersion.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

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
