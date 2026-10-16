import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Ros2ServerBindingElement from '../../../../../../elements/bindings/ros2/Ros2ServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface Ros2ServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class Ros2ServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: Ros2ServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ros2', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: Ros2ServerBindingVisitorOptions) {
    super(options);
    this.element = new Ros2ServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ros2', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Ros2ServerBindingVisitor;
