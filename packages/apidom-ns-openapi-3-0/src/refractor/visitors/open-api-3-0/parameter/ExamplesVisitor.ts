import BaseExamplesVisitor, { ExamplesVisitorOptions } from '../ExamplesVisitor.ts';
import ParameterExamplesElement from '../../../../elements/nces/ParameterExamples.ts';

export type { ExamplesVisitorOptions };

class ExamplesVisitor extends BaseExamplesVisitor {
  public declare readonly element: ParameterExamplesElement;

  constructor(options: ExamplesVisitorOptions) {
    super(options);
    this.element = new ParameterExamplesElement();
  }
}

export default ExamplesVisitor;
