import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import DefaultContentTypeElement from '../../../elements/DefaultContentType';

class DefaultContentTypeVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare element: DefaultContentTypeElement;

  StringElement(stringElement: StringElement) {
    const defaultContentTypeElement = new DefaultContentTypeElement(toValue(stringElement));

    this.copyMetaAndAttributes(stringElement, defaultContentTypeElement);

    this.element = defaultContentTypeElement;
    return BREAK;
  }
}

export default DefaultContentTypeVisitor;
