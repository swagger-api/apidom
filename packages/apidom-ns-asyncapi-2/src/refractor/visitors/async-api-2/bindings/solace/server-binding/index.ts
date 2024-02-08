import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SolaceServerBindingElement from '../../../../../../elements/bindings/solace/SolaceServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface SolaceServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class SolaceServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SolaceServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'solace', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: SolaceServerBindingVisitorOptions) {
    super(options);
    this.element = new SolaceServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'solace', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SolaceServerBindingVisitor;
