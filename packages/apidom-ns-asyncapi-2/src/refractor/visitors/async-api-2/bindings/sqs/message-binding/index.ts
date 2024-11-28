import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SqsMessageBindingElement from '../../../../../../elements/bindings/sqs/SqsMessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface SqsMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SqsMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: SqsMessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'sqs', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: SqsMessageBindingVisitorOptions) {
    super(options);
    this.element = new SqsMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'sqs', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SqsMessageBindingVisitor;
