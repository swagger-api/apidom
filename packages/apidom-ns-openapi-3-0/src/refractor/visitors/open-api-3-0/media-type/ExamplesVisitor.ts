import BaseExamplesVisitor, { ExamplesVisitorOptions } from '../ExamplesVisitor';
import MediaTypeExamples from '../../../../elements/nces/MediaTypeExamples';

export type { ExamplesVisitorOptions };

class ExamplesVisitor extends BaseExamplesVisitor {
  public declare readonly element: MediaTypeExamples;

  constructor(options: ExamplesVisitorOptions) {
    super(options);
    this.element = new MediaTypeExamples();
  }
}

export default ExamplesVisitor;
