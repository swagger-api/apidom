import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Amqp1ServerBindingElement from '../../../../../../elements/bindings/amqp1/Amqp1ServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class Amqp1ServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: Amqp1ServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'amqp1', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new Amqp1ServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'amqp1', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Amqp1ServerBindingVisitor;
