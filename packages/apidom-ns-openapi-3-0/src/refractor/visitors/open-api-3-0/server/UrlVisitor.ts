import stampit from 'stampit';
import { StringElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';

const UrlVisitor = stampit(FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      this.element = cloneDeep(stringElement);
      this.element.classes.push('server-url');

      return BREAK;
    },
  },
});

export default UrlVisitor;
