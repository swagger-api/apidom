import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MqttMessageBindingElement from '../../../../../../elements/bindings/mqtt/MqttMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class MqttMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MqttMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new MqttMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MqttMessageBindingVisitor;
