import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import SwaggerVersionElement from '../../../elements/SwaggerVersion';
import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';

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
