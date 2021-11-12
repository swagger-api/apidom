import stampit from 'stampit';

import PathItemParametersElement from '../../../../elements/nces/PathItemParameters';
import BaseParametersVisitor from '../ParametersVisitor';

const ParametersVisitor = stampit(BaseParametersVisitor, {
  init() {
    this.element = new PathItemParametersElement();
  },
});

export default ParametersVisitor;
