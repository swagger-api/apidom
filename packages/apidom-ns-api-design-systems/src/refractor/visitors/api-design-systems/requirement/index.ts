import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import RequirementElement from '../../../../elements/Requirement';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

class RequirementVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public readonly element: RequirementElement;

  constructor(options = {}) {
    super(options);
    this.specPath = always(['document', 'objects', 'Requirement']);
    this.element = new RequirementElement();
  }
}

export default RequirementVisitor;
