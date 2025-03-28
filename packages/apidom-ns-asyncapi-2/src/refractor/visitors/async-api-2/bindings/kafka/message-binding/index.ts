import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import KafkaMessageBindingElement from '../../../../../../elements/bindings/kafka/KafkaMessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface KafkaMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class KafkaMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: KafkaMessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'kafka', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: KafkaMessageBindingVisitorOptions) {
    super(options);
    this.element = new KafkaMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'kafka', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default KafkaMessageBindingVisitor;
