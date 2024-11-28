import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import SwaggerVersionElement from '../../../elements/SwaggerVersion.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

/**
 * @public
 */
export interface SwaggerVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SwaggerVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public element: SwaggerVersionElement;

  StringElement(stringElement: StringElement) {
    const swaggerVersionElement = new SwaggerVersionElement(toValue(stringElement));

    this.copyMetaAndAttributes(stringElement, swaggerVersionElement);

    this.element = swaggerVersionElement;
    return BREAK;
  }
}

export default SwaggerVisitor;
