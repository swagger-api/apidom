import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import FailureActionElement from '../../../../elements/FailureAction';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';

class FailureActionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: FailureActionElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'FailureAction']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new FailureActionElement();
    this.specPath = always(['document', 'objects', 'FailureAction']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default FailureActionVisitor;
