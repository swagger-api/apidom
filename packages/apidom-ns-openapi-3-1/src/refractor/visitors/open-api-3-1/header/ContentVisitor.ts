import stampit from 'stampit';
import { HeaderContentElement } from '@swagger-api/apidom-ns-openapi-3-0';

import BaseContentVisitor from '../ContentVisitor';

const ContentVisitor = stampit(BaseContentVisitor, {
  init() {
    this.element = new HeaderContentElement();
  },
});

export default ContentVisitor;
