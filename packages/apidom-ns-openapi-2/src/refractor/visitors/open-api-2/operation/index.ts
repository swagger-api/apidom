import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import OperationElement from '../../../../elements/Operation.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface OperationVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class OperationVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: OperationElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Operation']>;

  constructor(options: OperationVisitorOptions) {
    super(options);
    this.element = new OperationElement();
    this.specPath = always(['document', 'objects', 'Operation']);
  }
}

export default OperationVisitor;
