import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import KafkaMessageBindingElement from '../../../../../../elements/bindings/kafka/KafkaMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface KafkaMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class KafkaMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: KafkaMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'kafka', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: KafkaMessageBindingVisitorOptions) {
    super(options);
    this.element = new KafkaMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'kafka', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default KafkaMessageBindingVisitor;
