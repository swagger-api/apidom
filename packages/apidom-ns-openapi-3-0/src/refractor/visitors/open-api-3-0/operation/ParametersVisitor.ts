import OperationParametersElement from '../../../../elements/nces/OperationParameters';
import BaseParametersVisitor, { ParametersVisitorOptions } from '../ParametersVisitor';

export type { ParametersVisitorOptions };

class ParametersVisitor extends BaseParametersVisitor {
  public declare readonly element: OperationParametersElement;

  constructor(options: ParametersVisitorOptions) {
    super(options);
    this.element = new OperationParametersElement();
  }
}

export default ParametersVisitor;
