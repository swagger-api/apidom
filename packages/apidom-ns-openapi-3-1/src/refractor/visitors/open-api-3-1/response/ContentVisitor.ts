import stampit from 'stampit';
import { ResponseContentElement } from '@swagger-api/apidom-ns-openapi-3-0';

import BaseContentVisitor from '../ContentVisitor';

const ContentVisitor = stampit(BaseContentVisitor, {
  init() {
    this.element = new ResponseContentElement();
  },
});

export default ContentVisitor;
