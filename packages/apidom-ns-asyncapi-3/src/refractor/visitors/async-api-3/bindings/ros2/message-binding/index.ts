import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Ros2MessageBindingElement from '../../../../../../elements/bindings/ros2/Ros2MessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface Ros2MessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class Ros2MessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: Ros2MessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ros2', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: Ros2MessageBindingVisitorOptions) {
    super(options);
    this.element = new Ros2MessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ros2', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Ros2MessageBindingVisitor;
