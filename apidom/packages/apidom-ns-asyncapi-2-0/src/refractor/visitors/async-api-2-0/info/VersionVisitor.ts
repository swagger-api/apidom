import stampit from 'stampit';
import { StringElement } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';
import { appendMetadata } from '../../../metadata';
import { BREAK } from '../../../../traversal/visitor';

const VersionVisitor = stampit(FallbackVisitor, {
  methods: {
    string(stringElement: StringElement) {
      this.element = new StringElement(stringElement.toValue());

      this.copyMetaAndAttributes(stringElement, this.element);
      appendMetadata(['version'], this.element);

      return BREAK;
    },
  },
});

export default VersionVisitor;
