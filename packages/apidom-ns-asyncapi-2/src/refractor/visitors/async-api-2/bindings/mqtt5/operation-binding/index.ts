import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Mqtt5OperationBindingElement from '../../../../../../elements/bindings/mqtt5/Mqtt5OperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface Mqtt5OperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class Mqtt5OperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: Mqtt5OperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt5', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: Mqtt5OperationBindingVisitorOptions) {
    super(options);
    this.element = new Mqtt5OperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt5', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Mqtt5OperationBindingVisitor;
