import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import CriterionElement from '../../../../elements/Criterion';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

class CriterionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public readonly element: CriterionElement;

  constructor(options = {}) {
    super(options);
    this.element = new CriterionElement();
    this.specPath = always(['document', 'objects', 'Criterion']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default CriterionVisitor;
