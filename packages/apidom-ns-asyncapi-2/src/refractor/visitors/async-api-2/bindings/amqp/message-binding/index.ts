import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AmqpMessageBindingElement from '../../../../../../elements/bindings/amqp/AmqpMessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface AmqpMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AmqpMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: AmqpMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'amqp', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: AmqpMessageBindingVisitorOptions) {
    super(options);
    this.element = new AmqpMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'amqp', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default AmqpMessageBindingVisitor;
