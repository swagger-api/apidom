import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import DefaultContentTypeElement from '../../../elements/DefaultContentType.ts';

/**
 * @public
 */
export interface DefaultContentTypeVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
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
