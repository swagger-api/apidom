import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import NatsChannelBindingElement from '../../../../../../elements/bindings/nats/NatsChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface NatsChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class NatsChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: NatsChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'nats', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: NatsChannelBindingVisitorOptions) {
    super(options);
    this.element = new NatsChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'nats', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default NatsChannelBindingVisitor;
