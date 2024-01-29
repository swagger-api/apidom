import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';
import OpenapiElement from '../../../elements/Openapi';

class OpenapiVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  StringElement(stringElement: StringElement) {
    const openapiElement = new OpenapiElement(toValue(stringElement));

    this.copyMetaAndAttributes(stringElement, openapiElement);

    this.element = openapiElement;
    return BREAK;
  }
}

export default OpenapiVisitor;
