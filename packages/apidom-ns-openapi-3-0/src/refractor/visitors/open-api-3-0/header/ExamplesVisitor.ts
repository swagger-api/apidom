import BaseExamplesVisitor, { ExamplesVisitorOptions } from '../ExamplesVisitor';
import HeaderExamplesElement from '../../../../elements/nces/HeaderExamples';

export type { ExamplesVisitorOptions };

class ExamplesVisitor extends BaseExamplesVisitor {
  public declare readonly element: HeaderExamplesElement;

  constructor(options: ExamplesVisitorOptions) {
    super(options);
    this.element = new HeaderExamplesElement();
  }
}

export default ExamplesVisitor;
