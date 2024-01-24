import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import CriterionElement from '../../../../elements/Criterion';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';

class CriterionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: CriterionElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Criterion']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new CriterionElement();
    this.specPath = always(['document', 'objects', 'Criterion']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default CriterionVisitor;
