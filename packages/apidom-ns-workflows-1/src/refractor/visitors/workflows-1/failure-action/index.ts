import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import FailureActionElement from '../../../../elements/FailureAction';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

class FailureActionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public readonly element: FailureActionElement;

  constructor(options = {}) {
    super(options);
    this.element = new FailureActionElement();
    this.specPath = always(['document', 'objects', 'FailureAction']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default FailureActionVisitor;
