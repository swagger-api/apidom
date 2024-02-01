import PathItemParametersElement from '../../../../elements/nces/PathItemParameters';
import BaseParametersVisitor, { ParametersVisitorOptions } from '../ParametersVisitor';

export type { ParametersVisitorOptions };

class ParametersVisitor extends BaseParametersVisitor {
  public declare readonly element: PathItemParametersElement;

  constructor(options: ParametersVisitorOptions) {
    super(options);
    this.element = new PathItemParametersElement();
  }
}

export default ParametersVisitor;
