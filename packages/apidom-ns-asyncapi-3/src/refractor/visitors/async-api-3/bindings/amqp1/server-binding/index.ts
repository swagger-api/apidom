import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Amqp1ServerBindingElement from '../../../../../../elements/bindings/amqp1/Amqp1ServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface Amqp1ServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class Amqp1ServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: Amqp1ServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'amqp1', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: Amqp1ServerBindingVisitorOptions) {
    super(options);
    this.element = new Amqp1ServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'amqp1', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Amqp1ServerBindingVisitor;
