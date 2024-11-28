import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AmqpOperationBindingElement from '../../../../../../elements/bindings/amqp/AmqpOperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface AmqpOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AmqpOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: AmqpOperationBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'amqp', 'OperationBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: AmqpOperationBindingVisitorOptions) {
    super(options);
    this.element = new AmqpOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'amqp', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default AmqpOperationBindingVisitor;
