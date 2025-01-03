import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, isStringElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import ChannelItemServersElement from '../../../../elements/nces/ChannelItemsServers.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface ServersVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ServersVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public readonly element: ChannelItemServersElement;

  constructor(options: ServersVisitorOptions) {
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
