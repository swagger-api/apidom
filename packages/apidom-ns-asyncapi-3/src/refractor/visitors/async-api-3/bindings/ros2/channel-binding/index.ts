import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Ros2ChannelBindingElement from '../../../../../../elements/bindings/ros2/Ros2ChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface Ros2ChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class Ros2ChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ros2', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: Ros2ChannelBindingVisitorOptions) {
    super(options);
    this.element = new Ros2ChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ros2', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Ros2ChannelBindingVisitor;
