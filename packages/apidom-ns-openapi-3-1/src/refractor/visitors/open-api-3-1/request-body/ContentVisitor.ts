import stampit from 'stampit';
import { RequestBodyContentElement } from '@swagger-api/apidom-ns-openapi-3-0';

import BaseContentVisitor from '../ContentVisitor';

const ContentVisitor = stampit(BaseContentVisitor, {
  init() {
    this.element = new RequestBodyContentElement();
  },
});

export default ContentVisitor;
