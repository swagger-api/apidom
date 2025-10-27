import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, isStringElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import ChannelServersElement from '../../../../elements/nces/ChannelServers.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceElement } from '@swagger-api/apidom-ns-asyncapi-2';

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
  declare public readonly element: ChannelServersElement;

  constructor(options: ServersVisitorOptions) {
    super(options);
    this.element = new ChannelServersElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element) => {
      const element = cloneDeep(item);

      if (isReferenceElement(element)) {
        element.classes.push('server-name');
      }

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default ServersVisitor;
