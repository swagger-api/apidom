import stampit from 'stampit';
import { ArrayElement, Element, isStringElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import ChannelItemServersElement from '../../../../elements/nces/ChannelItemsServers';
import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const ServersVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new ChannelItemServersElement();
  },
  methods: {
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
    },
  },
});

export default ServersVisitor;
