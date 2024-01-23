import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SuccessActionElement from '../../../../elements/SuccessAction';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

class SuccessActionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public readonly element: SuccessActionElement;

  constructor(options = {}) {
    super(options);
    this.element = new SuccessActionElement();
    this.specPath = always(['document', 'objects', 'SuccessAction']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default SuccessActionVisitor;
