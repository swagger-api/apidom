import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Amqp1OperationBindingElement from '../../../../../../elements/bindings/amqp1/Amqp1OperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class Amqp1OperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: Amqp1OperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'amqp1', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new Amqp1OperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'amqp1', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Amqp1OperationBindingVisitor;
