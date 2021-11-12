import stampit from 'stampit';

import BaseExamplesVisitor from '../ExamplesVisitor';
import ParameterExamplesElement from '../../../../elements/nces/ParameterExamples';

const ExamplesVisitor = stampit(BaseExamplesVisitor, {
  init() {
    this.element = new ParameterExamplesElement();
  },
});

export default ExamplesVisitor;
