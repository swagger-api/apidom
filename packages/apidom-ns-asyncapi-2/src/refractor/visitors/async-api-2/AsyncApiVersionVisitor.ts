import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import AsyncApiVersionElement from '../../../elements/AsyncApiVersion.ts';

/**
 * @public
 */
export interface AsyncApiVersionVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AsyncApiVersionVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare element: AsyncApiVersionElement;

  StringElement(stringElement: StringElement) {
    const asyncApiVersionElement = new AsyncApiVersionElement(toValue(stringElement));

    this.copyMetaAndAttributes(stringElement, asyncApiVersionElement);

    this.element = asyncApiVersionElement;
    return BREAK;
  }
}

export default AsyncApiVersionVisitor;
