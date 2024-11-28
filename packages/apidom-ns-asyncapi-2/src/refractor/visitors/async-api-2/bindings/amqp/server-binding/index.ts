import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AmqpServerBindingElement from '../../../../../../elements/bindings/amqp/AmqpServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface AmqpServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AmqpServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: AmqpServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'amqp', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: AmqpServerBindingVisitorOptions) {
    super(options);
    this.element = new AmqpServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'amqp', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default AmqpServerBindingVisitor;
