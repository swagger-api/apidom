import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SqsServerBindingElement from '../../../../../../elements/bindings/sqs/SqsServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface SqsServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SqsServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: SqsServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'sqs', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: SqsServerBindingVisitorOptions) {
    super(options);
    this.element = new SqsServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'sqs', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SqsServerBindingVisitor;
