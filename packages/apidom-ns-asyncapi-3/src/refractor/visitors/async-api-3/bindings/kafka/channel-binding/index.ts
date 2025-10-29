import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import KafkaChannelBindingElement from '../../../../../../elements/bindings/kafka/KafkaChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface KafkaChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class KafkaChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: KafkaChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'kafka', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: KafkaChannelBindingVisitorOptions) {
    super(options);
    this.element = new KafkaChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'kafka', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default KafkaChannelBindingVisitor;
