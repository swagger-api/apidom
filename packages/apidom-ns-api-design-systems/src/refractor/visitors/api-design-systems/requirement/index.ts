import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import RequirementElement from '../../../../elements/Requirement';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor, { FixedFieldsVisitorOptions } from '../../generics/FixedFieldsVisitor';

class RequirementVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: RequirementElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.specPath = always(['document', 'objects', 'Requirement']);
    this.element = new RequirementElement();
  }
}

export default RequirementVisitor;
