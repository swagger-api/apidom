import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AmqpMessageBindingElement from '../../../../../../elements/bindings/amqp/AmqpMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class AmqpMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: AmqpMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'amqp', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new AmqpMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'amqp', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default AmqpMessageBindingVisitor;
