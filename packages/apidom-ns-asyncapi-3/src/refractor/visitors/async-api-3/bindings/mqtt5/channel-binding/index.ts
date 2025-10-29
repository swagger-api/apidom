import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Mqtt5ChannelBindingElement from '../../../../../../elements/bindings/mqtt5/Mqtt5ChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface Mqtt5ChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class Mqtt5ChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: Mqtt5ChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt5', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: Mqtt5ChannelBindingVisitorOptions) {
    super(options);
    this.element = new Mqtt5ChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt5', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Mqtt5ChannelBindingVisitor;
