import stampit from 'stampit';

import BaseContentVisitor from '../ContentVisitor';
import ParameterContentElement from '../../../../elements/nces/ParameterContent';

const ExamplesVisitor = stampit(BaseContentVisitor, {
  init() {
    this.element = new ParameterContentElement();
  },
});

export default ExamplesVisitor;
