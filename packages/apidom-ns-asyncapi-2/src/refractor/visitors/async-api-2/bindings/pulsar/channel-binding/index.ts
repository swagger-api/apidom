import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import PulsarChannelBindingElement from '../../../../../../elements/bindings/pulsar/PulsarChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface PulsarChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class PulsarChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'pulsar', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: PulsarChannelBindingVisitorOptions) {
    super(options);
    this.element = new PulsarChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'pulsar', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default PulsarChannelBindingVisitor;
