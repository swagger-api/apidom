import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import CorrelationIDElement from '../../../../elements/CorrelationID.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface CorrelationIDVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
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
