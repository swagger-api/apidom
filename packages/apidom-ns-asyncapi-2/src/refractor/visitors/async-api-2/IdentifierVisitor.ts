import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor';
import IdentifierElement from '../../../elements/Identifier';

export interface IdentifierVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

class IdentifierVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare element: IdentifierElement;

  StringElement(stringElement: StringElement) {
    const identifierElement = new IdentifierElement(toValue(stringElement));

    this.copyMetaAndAttributes(stringElement, identifierElement);

    this.element = identifierElement;
    return BREAK;
  }
}

export default IdentifierVisitor;
