import stampit from 'stampit';

import BaseExamplesVisitor from '../ExamplesVisitor';
import ComponentsExamplesElement from '../../../../elements/nces/ComponentsExamples';

const ExamplesVisitor = stampit(BaseExamplesVisitor, {
  init() {
    this.element = new ComponentsExamplesElement();
  },
});

export default ExamplesVisitor;
