import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import StepElement from '../../../../elements/Step';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';

class StepVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: StepElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Step']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new StepElement();
    this.specPath = always(['document', 'objects', 'Step']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default StepVisitor;
