import stampit from 'stampit';
import { StringElement, BREAK } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';

const VersionVisitor = stampit(FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      this.element = new StringElement(stringElement.toValue());

      this.copyMetaAndAttributes(stringElement, this.element);
      this.element.classes.push('version');

      return BREAK;
    },
  },
});

export default VersionVisitor;
