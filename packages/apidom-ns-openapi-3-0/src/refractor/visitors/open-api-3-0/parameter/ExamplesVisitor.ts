import BaseExamplesVisitor, { ExamplesVisitorOptions } from '../ExamplesVisitor';
import ParameterExamplesElement from '../../../../elements/nces/ParameterExamples';

class ExamplesVisitor extends BaseExamplesVisitor {
  public declare readonly element: ParameterExamplesElement;

  constructor(options: ExamplesVisitorOptions) {
    super(options);
    this.element = new ParameterExamplesElement();
  }
}

export default ExamplesVisitor;
