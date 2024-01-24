import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ParameterElement from '../../../../elements/Parameter';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

class ParameterVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ParameterElement;

  constructor(options = {}) {
    super(options);
    this.element = new ParameterElement();
    this.specPath = always(['document', 'objects', 'Parameter']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ParameterVisitor;
