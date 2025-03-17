import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import ArazzoSpecElement from '../../../elements/ArazzoSpec.ts';

/**
 * @public
 */
export interface ArazzoSpecVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ArazzoSpecVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public element: ArazzoSpecElement;

  StringElement(stringElement: StringElement) {
    const arazzoSpecElement = new ArazzoSpecElement(toValue(stringElement));

    this.copyMetaAndAttributes(stringElement, arazzoSpecElement);
    this.element = arazzoSpecElement;

    return BREAK;
  }
}

export default ArazzoSpecVisitor;
