import stampit from 'stampit';

import StepParametersElement from '../../../../elements/nces/StepParameters';
import BaseParametersVisitor from '../ParametersVisitor';

const ParametersVisitor = stampit(BaseParametersVisitor, {
  init() {
    this.element = new StepParametersElement();
  },
});

export default ParametersVisitor;
