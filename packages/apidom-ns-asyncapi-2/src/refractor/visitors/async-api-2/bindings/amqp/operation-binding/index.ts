import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AmqpOperationBindingElement from '../../../../../../elements/bindings/amqp/AmqpOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface AmqpOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class AmqpOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: AmqpOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'amqp', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: AmqpOperationBindingVisitorOptions) {
    super(options);
    this.element = new AmqpOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'amqp', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default AmqpOperationBindingVisitor;
