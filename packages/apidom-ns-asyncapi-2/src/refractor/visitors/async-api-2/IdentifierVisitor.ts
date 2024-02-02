import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import IdentifierElement from '../../../elements/Identifier';

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
