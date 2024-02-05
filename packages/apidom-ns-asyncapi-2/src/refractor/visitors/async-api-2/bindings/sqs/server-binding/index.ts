import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SqsServerBindingElement from '../../../../../../elements/bindings/sqs/SqsServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface SqsServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class SqsServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SqsServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'sqs', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: SqsServerBindingVisitorOptions) {
    super(options);
    this.element = new SqsServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'sqs', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SqsServerBindingVisitor;
