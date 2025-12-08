import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import KafkaOperationBindingElement from '../../../../../../elements/bindings/kafka/KafkaOperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface KafkaOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class KafkaOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: KafkaOperationBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'kafka', 'OperationBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: KafkaOperationBindingVisitorOptions) {
    super(options);
    this.element = new KafkaOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'kafka', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default KafkaOperationBindingVisitor;
