import stampit from 'stampit';

import ResponseContentElement from '../../../../elements/nces/ResponseContent';
import BaseContentVisitor from '../ContentVisitor';

const ContentVisitor = stampit(BaseContentVisitor, {
  init() {
    this.element = new ResponseContentElement();
  },
});

export default ContentVisitor;
