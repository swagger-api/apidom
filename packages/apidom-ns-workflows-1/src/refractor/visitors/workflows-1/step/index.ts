import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import StepElement from '../../../../elements/Step';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

class StepVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: StepElement;

  constructor(options = {}) {
    super(options);
    this.element = new StepElement();
    this.specPath = always(['document', 'objects', 'Step']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default StepVisitor;
