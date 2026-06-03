import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SignaturesElement from '../../../elements/nces/Signatures.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

/**
 * @public
 */
export interface SignaturesVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SignaturesVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public readonly element: SignaturesElement;

  constructor(options: SignaturesVisitorOptions) {
    super(options);
    this.element = new SignaturesElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'AgentCardSignature'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default SignaturesVisitor;
