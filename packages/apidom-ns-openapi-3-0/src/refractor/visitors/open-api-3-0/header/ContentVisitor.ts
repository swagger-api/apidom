import stampit from 'stampit';

import BaseContentVisitor from '../ContentVisitor';
import HeaderContentElement from '../../../../elements/nces/HeaderContent';

const ExamplesVisitor = stampit(BaseContentVisitor, {
  init() {
    this.element = new HeaderContentElement();
  },
});

export default ExamplesVisitor;
