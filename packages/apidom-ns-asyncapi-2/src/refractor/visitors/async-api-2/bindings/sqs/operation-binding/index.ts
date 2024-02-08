import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SqsOperationBindingElement from '../../../../../../elements/bindings/sqs/SqsOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface SqsOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class SqsOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SqsOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'sqs', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: SqsOperationBindingVisitorOptions) {
    super(options);
    this.element = new SqsOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'sqs', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SqsOperationBindingVisitor;
