import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MqttOperationBindingElement from '../../../../../../elements/bindings/mqtt/MqttOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class MqttOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MqttOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new MqttOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MqttOperationBindingVisitor;
