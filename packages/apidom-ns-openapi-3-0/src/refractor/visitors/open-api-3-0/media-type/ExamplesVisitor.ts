import BaseExamplesVisitor, { ExamplesVisitorOptions } from '../ExamplesVisitor.ts';
import MediaTypeExamples from '../../../../elements/nces/MediaTypeExamples.ts';

export type { ExamplesVisitorOptions };

/**
 * @public
 */
class ExamplesVisitor extends BaseExamplesVisitor {
  declare public readonly element: MediaTypeExamples;

  constructor(options: ExamplesVisitorOptions) {
    super(options);
    this.element = new MediaTypeExamples();
  }
}

export default ExamplesVisitor;
