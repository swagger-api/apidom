import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SolaceOperationBindingElement from '../../../../../../elements/bindings/solace/SolaceOperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface SolaceOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SolaceOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SolaceOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'solace', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: SolaceOperationBindingVisitorOptions) {
    super(options);
    this.element = new SolaceOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'solace', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SolaceOperationBindingVisitor;
