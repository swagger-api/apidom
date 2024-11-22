import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SnsChannelBindingElement from '../../../../../../elements/bindings/sns/SnsChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface SnsChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SnsChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SnsChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'sns', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: SnsChannelBindingVisitorOptions) {
    super(options);
    this.element = new SnsChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'sns', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SnsChannelBindingVisitor;
