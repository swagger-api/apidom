import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import AsyncApiVersionElement from '../../../elements/AsyncApiVersion';

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
