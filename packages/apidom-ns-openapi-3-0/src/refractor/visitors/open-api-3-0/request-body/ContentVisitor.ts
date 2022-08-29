import stampit from 'stampit';

import RequestBodyContentElement from '../../../../elements/nces/RequestBodyContent';
import BaseContentVisitor from '../ContentVisitor';

const ContentVisitor = stampit(BaseContentVisitor, {
  init() {
    this.element = new RequestBodyContentElement();
  },
});

export default ContentVisitor;
