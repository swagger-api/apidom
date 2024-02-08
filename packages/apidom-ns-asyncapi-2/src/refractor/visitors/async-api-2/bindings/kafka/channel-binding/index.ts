import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import KafkaChannelBindingElement from '../../../../../../elements/bindings/kafka/KafkaChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface KafkaChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class KafkaChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: KafkaChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'kafka', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: KafkaChannelBindingVisitorOptions) {
    super(options);
    this.element = new KafkaChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'kafka', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default KafkaChannelBindingVisitor;
