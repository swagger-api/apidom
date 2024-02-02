import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AmqpServerBindingElement from '../../../../../../elements/bindings/amqp/AmqpServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class AmqpServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: AmqpServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'amqp', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new AmqpServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'amqp', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default AmqpServerBindingVisitor;
