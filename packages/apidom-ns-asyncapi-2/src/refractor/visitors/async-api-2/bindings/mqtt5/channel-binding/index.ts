import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Mqtt5ChannelBindingElement from '../../../../../../elements/bindings/mqtt5/Mqtt5ChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface Mqtt5ChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class Mqtt5ChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: Mqtt5ChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt5', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: Mqtt5ChannelBindingVisitorOptions) {
    super(options);
    this.element = new Mqtt5ChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt5', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Mqtt5ChannelBindingVisitor;
