import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import CorrelationIDElement from '../../../../elements/CorrelationID';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface CorrelationIDVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class CorrelationIDVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: CorrelationIDElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'CorrelationID']>;

  constructor(options: CorrelationIDVisitorOptions) {
    super(options);
    this.element = new CorrelationIDElement();
    this.specPath = always(['document', 'objects', 'CorrelationID']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default CorrelationIDVisitor;
