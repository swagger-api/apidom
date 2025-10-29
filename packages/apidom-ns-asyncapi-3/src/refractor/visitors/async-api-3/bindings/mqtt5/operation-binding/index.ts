import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Mqtt5OperationBindingElement from '../../../../../../elements/bindings/mqtt5/Mqtt5OperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface Mqtt5OperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class Mqtt5OperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: Mqtt5OperationBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt5', 'OperationBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: Mqtt5OperationBindingVisitorOptions) {
    super(options);
    this.element = new Mqtt5OperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt5', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Mqtt5OperationBindingVisitor;
