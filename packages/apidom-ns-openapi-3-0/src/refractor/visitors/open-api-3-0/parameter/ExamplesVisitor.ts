import BaseExamplesVisitor, { ExamplesVisitorOptions } from '../ExamplesVisitor.ts';
import ParameterExamplesElement from '../../../../elements/nces/ParameterExamples.ts';

export type { ExamplesVisitorOptions };

/**
 * @public
 */
class ExamplesVisitor extends BaseExamplesVisitor {
  declare public readonly element: ParameterExamplesElement;

  constructor(options: ExamplesVisitorOptions) {
    super(options);
    this.element = new ParameterExamplesElement();
  }
}

export default ExamplesVisitor;
