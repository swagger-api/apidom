import stampit from 'stampit';
import { StringElement, BREAK } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';
import { appendMetadata } from '../../../metadata';

const VersionVisitor = stampit(FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      this.element = new StringElement(stringElement.toValue());
      this.copyMetaAndAttributes(stringElement, this.element);
      appendMetadata(['version'], this.element);

      return BREAK;
    },
  },
});

export default VersionVisitor;
