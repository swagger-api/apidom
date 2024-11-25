import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MqttChannelBindingElement from '../../../../../../elements/bindings/mqtt/MqttChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface MqttChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
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
