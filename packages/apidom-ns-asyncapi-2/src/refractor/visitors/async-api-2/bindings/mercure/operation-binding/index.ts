import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MercureOperationBindingElement from '../../../../../../elements/bindings/mercure/MercureOperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface MercureOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class MercureOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: MercureOperationBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mercure', 'OperationBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: MercureOperationBindingVisitorOptions) {
    super(options);
    this.element = new MercureOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mercure', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MercureOperationBindingVisitor;
