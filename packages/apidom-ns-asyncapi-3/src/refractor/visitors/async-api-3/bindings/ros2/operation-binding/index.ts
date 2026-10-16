import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Ros2OperationBindingElement from '../../../../../../elements/bindings/ros2/Ros2OperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface Ros2OperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class Ros2OperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: Ros2OperationBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ros2', 'OperationBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: Ros2OperationBindingVisitorOptions) {
    super(options);
    this.element = new Ros2OperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ros2', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Ros2OperationBindingVisitor;
