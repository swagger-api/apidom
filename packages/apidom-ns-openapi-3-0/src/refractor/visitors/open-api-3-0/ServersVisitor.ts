import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import ServersElement from '../../../elements/nces/Servers';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';
import { isServerLikeElement } from '../../predicates';

export type { SpecificationVisitorOptions as ServersVisitorOptions };

class ServersVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: ServersElement;

  constructor(options: SpecificationVisitorOptions) {
    super(options);
    this.element = new ServersElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element) => {
      const specPath = isServerLikeElement(item) ? ['document', 'objects', 'Server'] : ['value'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default ServersVisitor;
