import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MqttServerBindingElement from '../../../../../../elements/bindings/mqtt/MqttServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface MqttServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class MqttServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: MqttServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: MqttServerBindingVisitorOptions) {
    super(options);
    this.element = new MqttServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MqttServerBindingVisitor;
