import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import OperationSchemesElement from '../../../../elements/nces/OperationSchemes.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

export type { FallbackVisitorOptions as SchemesVisitorOptions };

/**
 * @public
 */
class SchemesVisitor extends FallbackVisitor {
  declare public element: OperationSchemesElement;

  constructor(options: FallbackVisitorOptions) {
    super(options);
    this.element = new OperationSchemesElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    this.element = this.element.concat(cloneDeep(arrayElement));

    return BREAK;
  }
}

export default SchemesVisitor;
