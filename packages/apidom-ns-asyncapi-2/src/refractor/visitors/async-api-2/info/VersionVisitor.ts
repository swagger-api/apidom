import stampit from 'stampit';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';

const VersionVisitor = stampit(FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      this.element = new StringElement(toValue(stringElement));

      this.copyMetaAndAttributes(stringElement, this.element);
      this.element.classes.push('api-version');
      this.element.classes.push('version');

      return BREAK;
    },
  },
});

export default VersionVisitor;
