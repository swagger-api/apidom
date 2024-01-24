import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import RequirementElement from '../../../../elements/Requirement';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';

class RequirementVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: RequirementElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Requirement']>;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new RequirementElement();
    this.specPath = always(['document', 'objects', 'Requirement']);
  }
}

export default RequirementVisitor;
