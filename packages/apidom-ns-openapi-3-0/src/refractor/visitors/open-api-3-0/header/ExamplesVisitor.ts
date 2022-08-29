import stampit from 'stampit';

import BaseExamplesVisitor from '../ExamplesVisitor';
import HeaderExamplesElement from '../../../../elements/nces/HeaderExamples';

const ExamplesVisitor = stampit(BaseExamplesVisitor, {
  init() {
    this.element = new HeaderExamplesElement();
  },
});

export default ExamplesVisitor;
