import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MqttServerBindingElement from '../../../../../../elements/bindings/mqtt/MqttServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface MqttServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class MqttServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MqttServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: MqttServerBindingVisitorOptions) {
    super(options);
    this.element = new MqttServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MqttServerBindingVisitor;
