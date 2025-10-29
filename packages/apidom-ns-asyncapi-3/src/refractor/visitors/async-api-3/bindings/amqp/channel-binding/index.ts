import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AmqpChannelBindingElement from '../../../../../../elements/bindings/amqp/AmqpChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface AmqpChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AmqpChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: AmqpChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'amqp', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: AmqpChannelBindingVisitorOptions) {
    super(options);
    this.element = new AmqpChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'amqp', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default AmqpChannelBindingVisitor;