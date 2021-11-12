import stampit from 'stampit';

import BaseExamplesVisitor from '../ExamplesVisitor';
import MediaTypeExamples from '../../../../elements/nces/MediaTypeExamples';

const ExamplesVisitor = stampit(BaseExamplesVisitor, {
  init() {
    this.element = new MediaTypeExamples();
  },
});

export default ExamplesVisitor;
