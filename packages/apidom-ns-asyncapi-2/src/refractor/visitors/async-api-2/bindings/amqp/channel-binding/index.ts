import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AmqpChannelBindingElement from '../../../../../../elements/bindings/amqp/AmqpChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class AmqpChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: AmqpChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'amqp', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new AmqpChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'amqp', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default AmqpChannelBindingVisitor;
