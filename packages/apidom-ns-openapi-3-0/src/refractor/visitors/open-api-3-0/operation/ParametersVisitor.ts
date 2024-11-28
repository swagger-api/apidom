import OperationParametersElement from '../../../../elements/nces/OperationParameters.ts';
import BaseParametersVisitor, { ParametersVisitorOptions } from '../ParametersVisitor.ts';

export type { ParametersVisitorOptions };

/**
 * @public
 */
class ParametersVisitor extends BaseParametersVisitor {
  declare public readonly element: OperationParametersElement;

  constructor(options: ParametersVisitorOptions) {
    super(options);
    this.element = new OperationParametersElement();
  }
}

export default ParametersVisitor;
