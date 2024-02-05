import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor';
import DefaultContentTypeElement from '../../../elements/DefaultContentType';

export interface DefaultContentTypeVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

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
