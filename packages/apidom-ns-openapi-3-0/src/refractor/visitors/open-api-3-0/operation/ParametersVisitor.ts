import stampit from 'stampit';

import OperationParametersElement from '../../../../elements/nces/OperationParameters';
import BaseParametersVisitor from '../ParametersVisitor';

const ParametersVisitor = stampit(BaseParametersVisitor, {
  init() {
    this.element = new OperationParametersElement();
  },
});

export default ParametersVisitor;
