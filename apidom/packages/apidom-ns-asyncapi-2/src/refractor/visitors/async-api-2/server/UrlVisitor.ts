import stampit from 'stampit';
import { StringElement, BREAK } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';

const UrlVisitor = stampit(FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      this.element = stringElement.clone();
      this.element.classes.push('server-url');

      return BREAK;
    },
  },
});

export default UrlVisitor;
