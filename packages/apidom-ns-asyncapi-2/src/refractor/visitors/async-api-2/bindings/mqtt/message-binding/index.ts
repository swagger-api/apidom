import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MqttMessageBindingElement from '../../../../../../elements/bindings/mqtt/MqttMessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface MqttMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class MqttMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: MqttMessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: MqttMessageBindingVisitorOptions) {
    super(options);
    this.element = new MqttMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MqttMessageBindingVisitor;
