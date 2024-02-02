import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import KafkaOperationBindingElement from '../../../../../../elements/bindings/kafka/KafkaOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class KafkaOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: KafkaOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'kafka', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new KafkaOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'kafka', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default KafkaOperationBindingVisitor;
