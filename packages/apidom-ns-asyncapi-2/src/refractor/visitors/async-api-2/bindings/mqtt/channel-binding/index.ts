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
  declare public readonly element: MqttChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: MqttChannelBindingVisitorOptions) {
    super(options);
    this.element = new MqttChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MqttChannelBindingVisitor;
