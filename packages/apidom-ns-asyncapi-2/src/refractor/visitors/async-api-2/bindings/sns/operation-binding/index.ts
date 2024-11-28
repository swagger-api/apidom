import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SnsOperationBindingElement from '../../../../../../elements/bindings/sns/SnsOperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface SnsOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SnsOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: SnsOperationBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'sns', 'OperationBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: SnsOperationBindingVisitorOptions) {
    super(options);
    this.element = new SnsOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'sns', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SnsOperationBindingVisitor;
