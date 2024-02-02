import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, isStringElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import ChannelItemServersElement from '../../../../elements/nces/ChannelItemsServers';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class ServersVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: ChannelItemServersElement;

  constructor(options: SpecificationVisitorOptions) {
    super(options);
    this.element = new ChannelItemServersElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element) => {
      const element = cloneDeep(item);

      if (isStringElement(element)) {
        element.classes.push('server-name');
      }

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default ServersVisitor;
