import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Amqp1ChannelBindingElement from '../../../../../../elements/bindings/amqp1/Amqp1ChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface Amqp1ChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class Amqp1ChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: Amqp1ChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'amqp1', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: Amqp1ChannelBindingVisitorOptions) {
    super(options);
    this.element = new Amqp1ChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'amqp1', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Amqp1ChannelBindingVisitor;
