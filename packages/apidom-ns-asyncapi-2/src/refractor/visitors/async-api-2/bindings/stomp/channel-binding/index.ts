import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import StompChannelBindingElement from '../../../../../../elements/bindings/stomp/StompChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface StompChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class StompChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: StompChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'stomp', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: StompChannelBindingVisitorOptions) {
    super(options);
    this.element = new StompChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'stomp', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default StompChannelBindingVisitor;
