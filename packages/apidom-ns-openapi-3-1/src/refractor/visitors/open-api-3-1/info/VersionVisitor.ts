import stampit from 'stampit';
import { StringElement, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';

const VersionVisitor = stampit(FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      this.element = stringElement.clone();
      this.element.classes.push('version');

      return BREAK;
    },
  },
});

export default VersionVisitor;
