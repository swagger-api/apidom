import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import IdentifierElement from '../../../elements/Identifier.ts';

/**
 * @public
 */
export interface IdentifierVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class IdentifierVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public element: IdentifierElement;

  StringElement(stringElement: StringElement) {
    const identifierElement = new IdentifierElement(toValue(stringElement));

    this.copyMetaAndAttributes(stringElement, identifierElement);

    this.element = identifierElement;
    return BREAK;
  }
}

export default IdentifierVisitor;
