import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SolaceOperationBindingElement from '../../../../../../elements/bindings/solace/SolaceOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface SolaceOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

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
