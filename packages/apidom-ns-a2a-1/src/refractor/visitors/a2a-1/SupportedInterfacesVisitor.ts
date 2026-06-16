import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';
import SupportedInterfacesElement from '../../../elements/nces/SupportedInterfaces.ts';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

/**
 * @public
 */
export interface SupportedInterfacesVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SupportedInterfacesVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public readonly element: SupportedInterfacesElement;

  constructor(options: SupportedInterfacesVisitorOptions) {
    super(options);
    this.element = new SupportedInterfacesElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'AgentInterface'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default SupportedInterfacesVisitor;
