import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Amqp1MessageBindingElement from '../../../../../../elements/bindings/amqp1/Amqp1MessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface Amqp1MessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class Amqp1MessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: Amqp1MessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'amqp1', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: Amqp1MessageBindingVisitorOptions) {
    super(options);
    this.element = new Amqp1MessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'amqp1', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Amqp1MessageBindingVisitor;
