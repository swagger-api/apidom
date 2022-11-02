import stampit from 'stampit';
import { Element } from '@swagger-api/apidom-core';

import ServerVariablesElement from '../../../../elements/nces/ServerVariables';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';

const VariablesVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) => {
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'ServerVariable'];
    },
  },
  init() {
    this.element = new ServerVariablesElement();
  },
});

export default VariablesVisitor;
