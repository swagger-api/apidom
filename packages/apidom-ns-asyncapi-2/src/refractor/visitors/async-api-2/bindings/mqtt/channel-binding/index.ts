import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MqttChannelBindingElement from '../../../../../../elements/bindings/mqtt/MqttChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface MqttChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class MqttChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MqttChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: MqttChannelBindingVisitorOptions) {
    super(options);
    this.element = new MqttChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MqttChannelBindingVisitor;
