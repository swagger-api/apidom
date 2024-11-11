import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SwaggerSchemesElement from '../../../elements/nces/SwaggerSchemes.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

export type { FallbackVisitorOptions as SchemesVisitorOptions };

class SchemesVisitor extends FallbackVisitor {
  public declare element: SwaggerSchemesElement;

  constructor(options: FallbackVisitorOptions) {
    super(options);
    this.element = new SwaggerSchemesElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    this.element = this.element.concat(cloneDeep(arrayElement));

    return BREAK;
  }
}

export default SchemesVisitor;
