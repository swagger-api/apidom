import stampit from 'stampit';
import { StringElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';

const VersionVisitor = stampit(FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      this.element = cloneDeep(stringElement);
      this.element.classes.push('api-version');
      this.element.classes.push('version');

      return BREAK;
    },
  },
});

export default VersionVisitor;
