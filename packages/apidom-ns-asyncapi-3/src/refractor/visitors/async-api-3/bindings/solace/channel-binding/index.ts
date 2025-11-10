import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SolaceChannelBindingElement from '../../../../../../elements/bindings/solace/SolaceChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface SolaceChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SolaceChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: SolaceChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'solace', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: SolaceChannelBindingVisitorOptions) {
    super(options);
    this.element = new SolaceChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'solace', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SolaceChannelBindingVisitor;
