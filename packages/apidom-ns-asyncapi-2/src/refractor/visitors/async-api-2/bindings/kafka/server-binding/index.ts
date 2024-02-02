import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import KafkaServerBindingElement from '../../../../../../elements/bindings/kafka/KafkaServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class KafkaServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: KafkaServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'kafka', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new KafkaServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'kafka', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default KafkaServerBindingVisitor;
