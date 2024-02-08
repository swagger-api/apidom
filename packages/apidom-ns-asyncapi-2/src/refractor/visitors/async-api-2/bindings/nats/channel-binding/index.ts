import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import NatsChannelBindingElement from '../../../../../../elements/bindings/nats/NatsChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface NatsChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class NatsChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: NatsChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'nats', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: NatsChannelBindingVisitorOptions) {
    super(options);
    this.element = new NatsChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'nats', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default NatsChannelBindingVisitor;
