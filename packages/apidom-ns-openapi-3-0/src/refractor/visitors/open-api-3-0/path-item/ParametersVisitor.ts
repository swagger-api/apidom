import PathItemParametersElement from '../../../../elements/nces/PathItemParameters.ts';
import BaseParametersVisitor, { ParametersVisitorOptions } from '../ParametersVisitor.ts';

export type { ParametersVisitorOptions };

/**
 * @public
 */
class ParametersVisitor extends BaseParametersVisitor {
  declare public readonly element: PathItemParametersElement;

  constructor(options: ParametersVisitorOptions) {
    super(options);
    this.element = new PathItemParametersElement();
  }
}

export default ParametersVisitor;
