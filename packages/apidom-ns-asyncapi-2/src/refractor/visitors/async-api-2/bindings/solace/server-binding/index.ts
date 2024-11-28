import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SolaceServerBindingElement from '../../../../../../elements/bindings/solace/SolaceServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface SolaceServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SolaceServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: SolaceServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'solace', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: SolaceServerBindingVisitorOptions) {
    super(options);
    this.element = new SolaceServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'solace', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SolaceServerBindingVisitor;
