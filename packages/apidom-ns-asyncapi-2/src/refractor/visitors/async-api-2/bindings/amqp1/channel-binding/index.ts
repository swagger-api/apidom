import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Amqp1ChannelBindingElement from '../../../../../../elements/bindings/amqp1/Amqp1ChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface Amqp1ChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class Amqp1ChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: Amqp1ChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'amqp1', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: Amqp1ChannelBindingVisitorOptions) {
    super(options);
    this.element = new Amqp1ChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'amqp1', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Amqp1ChannelBindingVisitor;
