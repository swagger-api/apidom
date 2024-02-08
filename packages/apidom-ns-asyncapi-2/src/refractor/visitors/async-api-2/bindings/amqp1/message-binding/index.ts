import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Amqp1MessageBindingElement from '../../../../../../elements/bindings/amqp1/Amqp1MessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface Amqp1MessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class Amqp1MessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: Amqp1MessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'amqp1', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: Amqp1MessageBindingVisitorOptions) {
    super(options);
    this.element = new Amqp1MessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'amqp1', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Amqp1MessageBindingVisitor;
