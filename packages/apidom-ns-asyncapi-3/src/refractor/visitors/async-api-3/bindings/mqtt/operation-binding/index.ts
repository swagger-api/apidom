import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MqttOperationBindingElement from '../../../../../../elements/bindings/mqtt/MqttOperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface MqttOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class MqttOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: MqttOperationBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt', 'OperationBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: MqttOperationBindingVisitorOptions) {
    super(options);
    this.element = new MqttOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MqttOperationBindingVisitor;
