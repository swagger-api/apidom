import stampit from 'stampit';
import { StringElement, BREAK } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';

const $refVisitor = stampit(FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      this.element = stringElement.clone();
      this.element.classes.push('reference-value');

      return BREAK;
    },
  },
});

export default $refVisitor;
